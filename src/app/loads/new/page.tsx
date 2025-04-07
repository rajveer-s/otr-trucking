'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2, Upload, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { mockTrucks } from '@/lib/data/mockData';

// Define the fuel stop schema
const fuelStopSchema = z.object({
  id: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  gallons: z.string().transform((val) => parseFloat(val)),
  pricePerGallon: z.string().transform((val) => parseFloat(val)),
  date: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
});

// Define the main form schema
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  pickupCity: z.string().min(1, { message: "Pickup location is required" }),
  dropoffCity: z.string().min(1, { message: "Delivery location is required" }),
  status: z.enum(["pending", "in-progress", "completed", "cancelled"]),
  paymentStatus: z.enum(["pending", "paid", "due", "overdue"]),
  paymentAmount: z.number().min(0, { message: "Payment amount must be positive" }),
  dispatcherPercentage: z.number().min(0, { message: "Dispatcher percentage must be positive" }),
  miles: z.number().min(0, { message: "Miles must be positive" }),
  truckId: z.string().min(1, { message: "Please select a truck" }),
  currentTruckMileage: z.number().min(0, { message: "Current mileage must be positive" }),
  fuelStops: z.array(z.object({
    location: z.string(),
    gallons: z.number(),
    pricePerGallon: z.number(),
    totalCost: z.number(),
    date: z.string(),
    notes: z.string().optional()
  })).optional(),
  notes: z.string().optional()
});

export default function NewLoadPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [paperworkPreview, setPaperworkPreview] = useState<string | null>(null);
  const [selectedTruck, setSelectedTruck] = useState<string>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      pickupCity: '',
      dropoffCity: '',
      dispatcherPercentage: 0,
      paymentAmount: 0,
      miles: 0,
      status: 'pending',
      paymentStatus: 'pending',
      truckId: '',
      currentTruckMileage: undefined,
      fuelStops: [],
      notes: ''
    }
  });

  // Initialize the field array for fuel stops
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "fuelStops",
  });

  // Function to add a new fuel stop
  const handleAddFuelStop = () => {
    append({
      location: '',
      gallons: 0,
      pricePerGallon: 0,
      totalCost: 0,
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Calculate total fuel cost, total gallons, and average price per gallon
      const fuelStops = values.fuelStops || [];
      const totalFuelCost = fuelStops.reduce((total, stop) => {
        return total + (stop.gallons * stop.pricePerGallon);
      }, 0);

      const totalGallons = fuelStops.reduce((total, stop) => {
        return total + stop.gallons;
      }, 0);

      const averagePricePerGallon = totalGallons > 0 ? totalFuelCost / totalGallons : 0;

      // Create the new load
      const newLoad = {
        ...values,
        fuelStops: fuelStops,
        totalFuelCost,
        totalFuelGallons: totalGallons,
        averagePricePerGallon,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Load has been created successfully');
      router.push('/loads');
    } catch (error) {
      console.error('Error creating load:', error);
      toast.error('Failed to create load');
    }
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaperworkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaperworkPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update form when truck is selected
  const handleTruckSelection = (truckId: string) => {
    const selectedTruck = mockTrucks.find(truck => truck.id === truckId);
    if (selectedTruck) {
      form.setValue('truckId', truckId);
      form.setValue('currentTruckMileage', selectedTruck.mileage);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold">New Load</h1>
        <p className="text-gray-400 mt-1">Add a new load to your schedule</p>
      </motion.div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Load Name</FormLabel>
                  <FormControl>
                    <Input placeholder="LA to NYC Route" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pickupCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup City</FormLabel>
                  <FormControl>
                    <Input placeholder="Los Angeles, CA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dropoffCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dropoff City</FormLabel>
                  <FormControl>
                    <Input placeholder="New York, NY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dispatcherPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dispatcher %</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Amount</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="4500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="miles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Miles</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="2789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Status</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="due">Due</option>
                      <option value="paid">Paid</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="truckId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Truck</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleTruckSelection(e.target.value);
                      }}
                    >
                      <option value="">Select a truck</option>
                      {mockTrucks.map((truck) => (
                        <option key={truck.id} value={truck.id}>
                          {truck.name} - Current Mileage: {truck.mileage}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentTruckMileage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Truck Mileage</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter current mileage"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                      disabled={!form.watch('truckId')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Fuel Stops</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddFuelStop}
                className="bg-[#18181b]/30 border-gray-800/50 hover:bg-[#18181b]/50 hover:border-gray-700/50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Fuel Stop
              </Button>
            </div>

            {fields.length === 0 && (
              <div className="text-center py-6 text-gray-400">
                No fuel stops added yet. Click "Add Fuel Stop" to add one.
              </div>
            )}

            {fields.map((field, index) => (
              <div key={field.id} className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Fuel Stop #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`fuelStops.${index}.location`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Gas Station Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`fuelStops.${index}.date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`fuelStops.${index}.gallons`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gallons</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`fuelStops.${index}.pricePerGallon`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price per Gallon</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="3.40" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`fuelStops.${index}.notes`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Notes (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Any additional notes" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <FormLabel>Fuel Receipt</FormLabel>
              <Input
                type="file"
                onChange={handleReceiptUpload}
                className="bg-[#18181b]/30 border-gray-800/50 hover:bg-[#18181b]/50 hover:border-gray-700/50"
              />
            </div>

            <div>
              <FormLabel>Load Paperwork</FormLabel>
              <Input
                type="file"
                onChange={handlePaperworkUpload}
                className="bg-[#18181b]/30 border-gray-800/50 hover:bg-[#18181b]/50 hover:border-gray-700/50"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="bg-[#18181b]/30 border-gray-800/50 hover:bg-[#18181b]/50 hover:border-gray-700/50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-orange-600 hover:bg-orange-700 text-white border border-orange-500"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Load'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

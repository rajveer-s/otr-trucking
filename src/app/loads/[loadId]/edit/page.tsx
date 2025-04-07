'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { mockLoads, mockTrucks } from '@/lib/data/mockData';
import { use } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';

const fuelStopSchema = z.object({
  id: z.string().optional(),
  location: z.string().min(1, 'Location is required'),
  gallons: z.string().min(1, 'Gallons is required'),
  pricePerGallon: z.string().min(1, 'Price per gallon is required'),
  date: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
});

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  pickupLocation: z.string().min(1, { message: "Pickup location is required" }),
  deliveryLocation: z.string().min(1, { message: "Delivery location is required" }),
  status: z.enum(["pending", "in-progress", "completed", "cancelled"]),
  paymentStatus: z.enum(["pending", "paid", "due", "overdue"]),
  paymentAmount: z.string().min(1, { message: "Payment amount is required" }),
  dispatcherPercentage: z.string().min(1, { message: "Dispatcher percentage is required" }),
  miles: z.string().min(1, { message: "Miles is required" }),
  truckId: z.string().min(1, 'Truck is required'),
  currentTruckMileage: z.string().optional(),
  notes: z.string().optional(),
  fuelStops: z.array(fuelStopSchema),
});

interface PageProps {
  params: {
    loadId: string;
  };
}

export default function EditLoadPage({ params }: { params: { loadId: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState<any>(null);
  const isNewLoad = params.loadId === 'new';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      pickupLocation: '',
      deliveryLocation: '',
      status: 'pending',
      paymentStatus: 'due',
      paymentAmount: '',
      dispatcherPercentage: '',
      miles: '',
      truckId: '',
      currentTruckMileage: '',
      notes: '',
      fuelStops: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'fuelStops',
  });

  // Watch for truck selection changes
  const selectedTruckId = form.watch('truckId');
  useEffect(() => {
    const truck = mockTrucks.find(t => t.id === selectedTruckId);
    if (truck) {
      setSelectedTruck(truck);
      // Set empty string instead of undefined
      form.setValue('currentTruckMileage', '');
    } else {
      setSelectedTruck(null);
      form.setValue('currentTruckMileage', '');
    }
    if (!isNewLoad) {
      // In a real app, this would be an API call
      const loadData = mockLoads.find(l => l.id === params.loadId);
      if (loadData) {
        form.reset({
          name: loadData.name || '',
          pickupLocation: loadData.pickupCity || '',
          deliveryLocation: loadData.dropoffCity || '',
          status: loadData.status || 'pending',
          paymentStatus: loadData.paymentStatus || 'due',
          paymentAmount: loadData.paymentAmount ? loadData.paymentAmount.toString() : '',
          dispatcherPercentage: loadData.dispatcherPercentage ? loadData.dispatcherPercentage.toString() : '',
          miles: loadData.miles ? loadData.miles.toString() : '',
          truckId: loadData.truckId || '',
          currentTruckMileage: '', // Don't pre-fill mileage when loading existing load
          notes: loadData.notes || '',
          fuelStops: loadData.fuelStops ? loadData.fuelStops.map(stop => ({
            id: stop.id,
            location: stop.location,
            gallons: stop.gallons.toString(),
            pricePerGallon: stop.pricePerGallon.toString(),
            date: stop.date,
            notes: stop.notes || '',
          })) : [],
        });
      }
    }
  }, [selectedTruckId, params.loadId, form, isNewLoad]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update truck mileage in mockTrucks
      const truckIndex = mockTrucks.findIndex(t => t.id === values.truckId);
      if (truckIndex !== -1 && values.currentTruckMileage) {
        mockTrucks[truckIndex].mileage = parseInt(values.currentTruckMileage);
      }

      // Calculate total fuel cost and gallons
      const fuelStops = values.fuelStops.map(stop => ({
        id: stop.id || crypto.randomUUID(),
        location: stop.location,
        gallons: parseFloat(stop.gallons),
        pricePerGallon: parseFloat(stop.pricePerGallon),
        totalCost: parseFloat(stop.gallons) * parseFloat(stop.pricePerGallon),
        date: stop.date,
        notes: stop.notes,
      }));

      const totalFuelCost = fuelStops.reduce((sum, stop) => sum + stop.totalCost, 0);
      const totalFuelGallons = fuelStops.reduce((sum, stop) => sum + stop.gallons, 0);
      const averagePricePerGallon = totalFuelGallons > 0 ? totalFuelCost / totalFuelGallons : 0;

      if (isNewLoad) {
        // Add new load
        mockLoads.push({
          id: crypto.randomUUID(),
          ...values,
          pickupCity: values.pickupLocation,
          dropoffCity: values.deliveryLocation,
          paymentAmount: parseFloat(values.paymentAmount),
          dispatcherPercentage: parseFloat(values.dispatcherPercentage),
          miles: parseFloat(values.miles),
          currentTruckMileage: values.currentTruckMileage ? parseInt(values.currentTruckMileage) : 0,
          fuelStops,
          totalFuelCost,
          totalFuelGallons,
          averagePricePerGallon,
          fuelCost: totalFuelCost,
          fuelGallons: totalFuelGallons,
          pricePerGallon: averagePricePerGallon,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        toast.success('Load added successfully');
      } else {
        // Update existing load
        const loadIndex = mockLoads.findIndex(l => l.id === params.loadId);
        if (loadIndex !== -1) {
          mockLoads[loadIndex] = {
            ...mockLoads[loadIndex],
            ...values,
            pickupCity: values.pickupLocation,
            dropoffCity: values.deliveryLocation,
            paymentAmount: parseFloat(values.paymentAmount),
            dispatcherPercentage: parseFloat(values.dispatcherPercentage),
            miles: parseFloat(values.miles),
            currentTruckMileage: values.currentTruckMileage ? parseInt(values.currentTruckMileage) : 0,
            fuelStops,
            totalFuelCost,
            totalFuelGallons,
            averagePricePerGallon,
            fuelCost: totalFuelCost,
            fuelGallons: totalFuelGallons,
            pricePerGallon: averagePricePerGallon,
            updatedAt: new Date().toISOString(),
          };
        }
        toast.success('Load updated successfully');
      }

      router.push('/loads');
    } catch (error) {
      toast.error(isNewLoad ? 'Failed to add load' : 'Failed to update load');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const addFuelStop = () => {
    append({
      location: '',
      gallons: '',
      pricePerGallon: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto px-6 pt-16"
    >
      <div className="flex flex-col mb-6">
        <h1 className="text-3xl font-bold">{isNewLoad ? 'New Load' : 'Edit Load'}</h1>
        <p className="text-gray-400 mt-1">{isNewLoad ? 'Add a new load to your schedule' : 'Edit your load'}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Load Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="LA to NYC Route"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pickupLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Los Angeles, CA"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dropoff City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New York, NY"
                      disabled={isLoading}
                      {...field}
                    />
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
                    <Input
                      type="number"
                      placeholder="0"
                      disabled={isLoading}
                      {...field}
                    />
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
                    <Input
                      type="number"
                      placeholder="0"
                      disabled={isLoading}
                      {...field}
                    />
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
                    <Input
                      type="number"
                      placeholder="0"
                      disabled={isLoading}
                      {...field}
                    />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pending" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Due" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="due">Due</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a truck" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockTrucks.map((truck) => (
                        <SelectItem key={truck.id} value={truck.id}>
                          {truck.name} - {truck.mileage.toLocaleString()} miles
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                      disabled={isLoading || !selectedTruckId}
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Fuel Stops</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addFuelStop}
                disabled={isLoading}
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
              <div key={field.id} className="p-4 border rounded-md space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Fuel Stop #{index + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`fuelStops.${index}.location`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter location"
                            disabled={isLoading}
                            {...field}
                          />
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
                          <Input
                            type="date"
                            disabled={isLoading}
                            {...field}
                          />
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
                          <Input
                            type="number"
                            placeholder="Enter gallons"
                            disabled={isLoading}
                            {...field}
                          />
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
                        <FormLabel>Price Per Gallon ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Enter price per gallon"
                            disabled={isLoading}
                            {...field}
                          />
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
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter notes (optional)"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter any additional notes"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
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
                  {isNewLoad ? 'Creating...' : 'Saving...'}
                </>
              ) : (
                isNewLoad ? 'Create Load' : 'Edit Load'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}

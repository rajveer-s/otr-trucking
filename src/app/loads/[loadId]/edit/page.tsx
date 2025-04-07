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
import { mockLoads } from '@/lib/data/mockData';
import { use } from 'react';
import { Plus, Trash2 } from 'lucide-react';

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
  const [load, setLoad] = useState<any>(null);

  // Get the loadId directly from params
  const loadId = params.loadId;

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
      notes: '',
      fuelStops: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'fuelStops',
  });

  useEffect(() => {
    // In a real app, this would be an API call
    const loadData = mockLoads.find(l => l.id === loadId);
    if (loadData) {
      setLoad(loadData);
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
  }, [loadId, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

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

      // Update the mock data
      const loadIndex = mockLoads.findIndex(l => l.id === loadId);
      if (loadIndex !== -1) {
        mockLoads[loadIndex] = {
          ...mockLoads[loadIndex],
          name: values.name,
          pickupCity: values.pickupLocation,
          dropoffCity: values.deliveryLocation,
          status: values.status,
          paymentStatus: values.paymentStatus,
          paymentAmount: parseFloat(values.paymentAmount),
          dispatcherPercentage: parseFloat(values.dispatcherPercentage),
          miles: parseFloat(values.miles),
          truckId: values.truckId,
          notes: values.notes,
          fuelStops,
          totalFuelCost,
          totalFuelGallons,
          averagePricePerGallon,
          updatedAt: new Date().toISOString(),
        };
      }

      toast.success('Load updated successfully');
      router.push('/loads');
    } catch (error) {
      toast.error('Failed to update load');
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

  if (!load) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Load not found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Edit Load</h1>
        <Button
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Load Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter load name"
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
                  <FormLabel>Pickup Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter pickup location"
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
                  <FormLabel>Delivery Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter delivery location"
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
                        <SelectValue placeholder="Select status" />
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
                        <SelectValue placeholder="Select payment status" />
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
              name="paymentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Amount ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter payment amount"
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
                  <FormLabel>Dispatcher Percentage (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter dispatcher percentage"
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
                      placeholder="Enter miles"
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
              name="truckId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Truck ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter truck ID"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Fuel Stops</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addFuelStop}
                disabled={isLoading}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Fuel Stop
              </Button>
            </div>

            {fields.length === 0 ? (
              <div className="text-center py-6 border border-dashed rounded-md">
                <p className="text-muted-foreground">No fuel stops added yet</p>
              </div>
            ) : (
              <div className="space-y-4">
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
            )}
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

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
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
import { mockTrucks } from '@/lib/data/mockData';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.string().min(1, 'Year is required'),
  vin: z.string().min(1, 'VIN is required'),
  licensePlate: z.string().min(1, 'License plate is required'),
  status: z.enum(['available', 'in-use', 'maintenance']),
  mileage: z.string().min(1, 'Mileage is required'),
  lastMaintenance: z.string().optional(),
  nextMaintenance: z.string().optional(),
  notes: z.string().optional(),
});

export default function EditTruckPage({ params }: { params: { truckId: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const isNewTruck = params.truckId === 'new';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      make: '',
      model: '',
      year: '',
      vin: '',
      licensePlate: '',
      status: 'available',
      mileage: '',
      lastMaintenance: '',
      nextMaintenance: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (!isNewTruck) {
      // In a real app, this would be an API call
      const truckData = mockTrucks.find(t => t.id === params.truckId);
      if (truckData) {
        form.reset({
          name: truckData.name || '',
          make: truckData.make || '',
          model: truckData.model || '',
          year: truckData.year ? truckData.year.toString() : '',
          vin: truckData.vin || '',
          licensePlate: truckData.licensePlate || '',
          status: truckData.status || 'available',
          mileage: truckData.mileage ? truckData.mileage.toString() : '',
          lastMaintenance: truckData.lastMaintenance || '',
          nextMaintenance: truckData.nextMaintenance || '',
          notes: truckData.notes || '',
        });
      }
    }
  }, [params.truckId, form, isNewTruck]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isNewTruck) {
        // Add new truck
        mockTrucks.push({
          id: crypto.randomUUID(),
          ...values,
          year: parseInt(values.year),
          mileage: parseInt(values.mileage),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        toast.success('Truck added successfully');
      } else {
        // Update existing truck
        const truckIndex = mockTrucks.findIndex(t => t.id === params.truckId);
        if (truckIndex !== -1) {
          mockTrucks[truckIndex] = {
            ...mockTrucks[truckIndex],
            ...values,
            year: parseInt(values.year),
            mileage: parseInt(values.mileage),
            updatedAt: new Date().toISOString(),
          };
        }
        toast.success('Truck updated successfully');
      }

      router.push('/trucks');
    } catch (error) {
      toast.error(isNewTruck ? 'Failed to add truck' : 'Failed to update truck');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6 pt-16"
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{isNewTruck ? 'Add New Truck' : 'Edit Truck'}</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Truck Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter truck name"
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
              name="make"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Make</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter make"
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
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter model"
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
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter year"
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
              name="vin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VIN</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter VIN"
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
              name="licensePlate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Plate</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter license plate"
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
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="in-use">In Use</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mileage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mileage</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter mileage"
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
              name="lastMaintenance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Maintenance</FormLabel>
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
          </div>

          <FormField
            control={form.control}
            name="nextMaintenance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Next Maintenance</FormLabel>
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
              className="bg-[#18181b]/30 border-gray-800/50 hover:bg-[#18181b]/50 hover:border-gray-700/50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-orange-600 hover:bg-orange-700 text-white border border-orange-500"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { OilReminder } from '@/components/OilReminder';
import { mockTrucks } from '@/lib/data/mockData';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function TruckDetailPage() {
  const params = useParams();
  const truck = mockTrucks.find((t) => t.id === params.truckId);
  const router = useRouter();

  if (!truck) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-muted-foreground">Truck not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{truck.name}</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push(`/trucks/${truck.id}/edit`)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Make</p>
              <p className="text-lg">{truck.make}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Model</p>
              <p className="text-lg">{truck.model}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Year</p>
              <p className="text-lg">{truck.year}</p>
            </div>
            <div>
              <p className="text-sm font-medium">VIN</p>
              <p className="text-lg">{truck.vin}</p>
            </div>
            <div>
              <p className="text-sm font-medium">License Plate</p>
              <p className="text-lg">{truck.licensePlate}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Current Mileage</p>
              <p className="text-lg">{truck.mileage.toLocaleString()} miles</p>
            </div>
            <div>
              <p className="text-sm font-medium">Next Maintenance Due</p>
              <p className="text-lg">
                {new Date(truck.nextMaintenance).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Current Status</p>
                <p className="text-lg capitalize">{truck.status}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Last Maintenance</p>
                <p className="text-lg">
                  {new Date(truck.lastMaintenance).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Fuel Efficiency</p>
                <p className="text-lg">{truck.fuelEfficiency} MPG</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

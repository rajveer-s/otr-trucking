import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Fuel, Calendar, DollarSign, Gauge } from 'lucide-react';

interface FuelReceiptProps {
  date: string;
  gallons: number;
  cost: number;
  pricePerGallon: number;
  location: string;
  odometerReading?: number;
}

export function FuelReceipt({
  date,
  gallons,
  cost,
  pricePerGallon,
  location,
  odometerReading,
}: FuelReceiptProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Fuel Receipt</CardTitle>
          <Badge variant="outline">{location}</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Date</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Gallons</p>
                <p className="text-sm text-muted-foreground">{gallons.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Price per Gallon</p>
                <p className="text-sm text-muted-foreground">${pricePerGallon.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Total Cost</p>
                <p className="text-sm text-muted-foreground">${cost.toFixed(2)}</p>
              </div>
            </div>
            {odometerReading && (
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Odometer Reading</p>
                  <p className="text-sm text-muted-foreground">{odometerReading.toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

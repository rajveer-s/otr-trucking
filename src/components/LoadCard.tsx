import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Load } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { MapPin, Truck, Calendar, DollarSign, TrendingUp, Fuel } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

interface LoadCardProps {
  load: Load;
}

export function LoadCard({ load }: LoadCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate rate per mile
  const ratePerMile = load.miles > 0 ? load.paymentAmount / load.miles : 0;

  // Format fuel stops for display
  const fuelStopsCount = load.fuelStops?.length || 0;
  const totalFuelCost = load.totalFuelCost || 0;
  const totalFuelGallons = load.totalFuelGallons || 0;
  const averagePricePerGallon = load.averagePricePerGallon || 0;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{load.name}</CardTitle>
          <div className="flex gap-2">
            <Badge variant={load.status === 'completed' ? 'default' : load.status === 'in-progress' ? 'secondary' : load.status === 'cancelled' ? 'destructive' : 'outline'}>
              {load.status.charAt(0).toUpperCase() + load.status.slice(1)}
            </Badge>
            <Badge variant={load.paymentStatus === 'paid' ? 'default' : 'destructive'}>
              {load.paymentStatus === 'paid' ? 'Paid' : 'Due'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="font-medium">From:</span> {load.pickupCity}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="font-medium">To:</span> {load.dropoffCity}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="font-medium">Truck ID:</span> {load.truckId}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="font-medium">Created:</span> {formatDate(load.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="font-medium">Payment:</span> {formatCurrency(load.paymentAmount)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="font-medium">Rate/Mile:</span> {formatCurrency(ratePerMile)}
              </span>
            </div>
          </div>
        </div>

        {/* Fuel Stops Section */}
        <Collapsible
          open={isExpanded}
          onOpenChange={setIsExpanded}
          className="mt-4 border rounded-md"
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full flex justify-between items-center p-2">
              <div className="flex items-center gap-2">
                <Fuel className="h-4 w-4" />
                <span>Fuel Stops ({fuelStopsCount})</span>
                {totalFuelCost > 0 && (
                  <Badge variant="outline" className="ml-2">
                    Total: {formatCurrency(totalFuelCost)}
                  </Badge>
                )}
              </div>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-2">
            {fuelStopsCount === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-2">No fuel stops recorded</p>
            ) : (
              <div className="space-y-3">
                {load.fuelStops.map((stop) => (
                  <div key={stop.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{stop.location}</p>
                      <p className="text-sm text-muted-foreground">
                        {stop.gallons} gallons @ ${stop.pricePerGallon}/gal
                      </p>
                    </div>
                    <p className="text-sm font-medium">${stop.totalCost}</p>
                  </div>
                ))}
                <div className="pt-2 border-t mt-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Gallons:</span>
                    <span className="font-medium">{totalFuelGallons}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Average Price/Gallon:</span>
                    <span className="font-medium">{formatCurrency(averagePricePerGallon)}</span>
                  </div>
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/loads/${load.id}`}>View Details</Link>
        </Button>
        <Button variant="default" size="sm" asChild>
          <Link href={`/loads/${load.id}/edit`}>Edit Load</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

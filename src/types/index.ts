export interface Load {
  id: string;
  name: string;
  pickupCity: string;
  dropoffCity: string;
  dispatcherPercentage: number;
  paymentAmount: number;
  fuelCost: number;
  fuelGallons: number;
  pricePerGallon: number;
  miles: number;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'due' | 'overdue';
  createdAt: string;
  updatedAt: string;
  truckId: string;
  currentTruckMileage: number;
  fuelStops: FuelStop[];
  totalFuelCost: number;
  totalFuelGallons: number;
  averagePricePerGallon: number;
  notes?: string;
}

export interface Truck {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  status: 'available' | 'in-use' | 'maintenance';
  lastMaintenance: string;
  lastMaintenanceMileage: number;
  nextMaintenance: string;
  mileage: number;
  fuelEfficiency: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  nextOilChangeDue: number;
  oilChanges: OilChange[];
}

export interface OilChange {
  id: string;
  truckId: string;
  miles: number;
  date: string;
  receiptUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'driver';
  avatar?: string;
  password: string;
  phone: string;
  licenseNumber?: string;
  experience?: string;
  preferredRoutes?: string[];
  department?: string;
  accessLevel?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalLoads: number;
  totalMiles: number;
  totalEarnings: number;
  fuelUsage: {
    date: string;
    gallons: number;
    cost: number;
  }[];
  weeklyEarnings: {
    week: string;
    amount: number;
  }[];
  maintenanceAlerts: {
    id: string;
    truckId: string;
    type: string;
    dueDate: string;
    description: string;
  }[];
  recentActivity: {
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }[];
}

export interface FuelStop {
  id: string;
  location: string;
  gallons: number;
  pricePerGallon: number;
  totalCost: number;
  date: string;
  notes?: string;
}

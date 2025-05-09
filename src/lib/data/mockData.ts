import { Load, Truck, User, DashboardStats } from '@/types';

export const mockLoads: Load[] = [
  {
    id: '1',
    name: 'LA to NYC Route',
    pickupCity: 'Los Angeles, CA',
    dropoffCity: 'New York, NY',
    dispatcherPercentage: 10,
    paymentAmount: 4500,
    fuelCost: 850,
    fuelGallons: 250,
    pricePerGallon: 3.40,
    miles: 2789,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-03T15:30:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [
      {
        id: 'fs1',
        location: 'Barstow, CA',
        gallons: 150,
        pricePerGallon: 4.25,
        totalCost: 637.50,
        date: '2024-03-15T10:30:00Z',
        notes: 'Filled up at Pilot Travel Center',
      },
      {
        id: 'fs2',
        location: 'Flagstaff, AZ',
        gallons: 180,
        pricePerGallon: 4.15,
        totalCost: 747.00,
        date: '2024-03-15T16:45:00Z',
        notes: 'Filled up at Love\'s Travel Stop',
      },
    ],
    totalFuelCost: 1384.50,
    totalFuelGallons: 330,
    averagePricePerGallon: 4.20,
    notes: 'Priority delivery',
  },
  {
    id: '2',
    name: 'Chicago to Dallas',
    pickupCity: 'Chicago, IL',
    dropoffCity: 'Dallas, TX',
    dispatcherPercentage: 12,
    paymentAmount: 3800,
    fuelCost: 720,
    fuelGallons: 200,
    pricePerGallon: 3.60,
    miles: 940,
    status: 'in-progress',
    paymentStatus: 'due',
    createdAt: '2024-03-05T08:00:00Z',
    updatedAt: '2024-03-05T08:00:00Z',
    truckId: '2',
    currentTruckMileage: 120000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Express delivery',
  },
  {
    id: '3',
    name: 'Miami to Atlanta',
    pickupCity: 'Miami, FL',
    dropoffCity: 'Atlanta, GA',
    dispatcherPercentage: 8,
    paymentAmount: 3200,
    fuelCost: 680,
    fuelGallons: 180,
    pricePerGallon: 3.78,
    miles: 662,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2024-03-10T09:00:00Z',
    updatedAt: '2024-03-11T14:20:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  {
    id: '4',
    name: 'Seattle to Portland',
    pickupCity: 'Seattle, WA',
    dropoffCity: 'Portland, OR',
    dispatcherPercentage: 15,
    paymentAmount: 2800,
    fuelCost: 450,
    fuelGallons: 120,
    pricePerGallon: 3.75,
    miles: 174,
    status: 'pending',
    paymentStatus: 'due',
    createdAt: '2024-03-15T11:00:00Z',
    updatedAt: '2024-03-15T11:00:00Z',
    truckId: '2',
    currentTruckMileage: 120000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Express delivery',
  },
  // February 2024 loads
  {
    id: '5',
    name: 'Denver to Phoenix',
    pickupCity: 'Denver, CO',
    dropoffCity: 'Phoenix, AZ',
    dispatcherPercentage: 9,
    paymentAmount: 3500,
    fuelCost: 780,
    fuelGallons: 220,
    pricePerGallon: 3.55,
    miles: 850,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2024-02-05T08:30:00Z',
    updatedAt: '2024-02-07T16:45:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  {
    id: '6',
    name: 'Houston to New Orleans',
    pickupCity: 'Houston, TX',
    dropoffCity: 'New Orleans, LA',
    dispatcherPercentage: 11,
    paymentAmount: 2900,
    fuelCost: 520,
    fuelGallons: 140,
    pricePerGallon: 3.71,
    miles: 350,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2024-02-15T10:15:00Z',
    updatedAt: '2024-02-16T14:30:00Z',
    truckId: '2',
    currentTruckMileage: 120000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  {
    id: '7',
    name: 'Las Vegas to Salt Lake City',
    pickupCity: 'Las Vegas, NV',
    dropoffCity: 'Salt Lake City, UT',
    dispatcherPercentage: 10,
    paymentAmount: 3100,
    fuelCost: 590,
    fuelGallons: 160,
    pricePerGallon: 3.69,
    miles: 420,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2024-02-20T09:45:00Z',
    updatedAt: '2024-02-21T12:15:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  // January 2024 loads
  {
    id: '8',
    name: 'Boston to Washington DC',
    pickupCity: 'Boston, MA',
    dropoffCity: 'Washington, DC',
    dispatcherPercentage: 13,
    paymentAmount: 3300,
    fuelCost: 610,
    fuelGallons: 170,
    pricePerGallon: 3.59,
    miles: 440,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2024-01-10T07:30:00Z',
    updatedAt: '2024-01-11T15:20:00Z',
    truckId: '2',
    currentTruckMileage: 120000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  {
    id: '9',
    name: 'Nashville to Memphis',
    pickupCity: 'Nashville, TN',
    dropoffCity: 'Memphis, TN',
    dispatcherPercentage: 8,
    paymentAmount: 2200,
    fuelCost: 420,
    fuelGallons: 110,
    pricePerGallon: 3.82,
    miles: 210,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-01-20T18:30:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  // December 2023 loads
  {
    id: '10',
    name: 'San Francisco to Sacramento',
    pickupCity: 'San Francisco, CA',
    dropoffCity: 'Sacramento, CA',
    dispatcherPercentage: 7,
    paymentAmount: 1800,
    fuelCost: 350,
    fuelGallons: 90,
    pricePerGallon: 3.89,
    miles: 90,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-12-05T08:15:00Z',
    updatedAt: '2023-12-05T14:45:00Z',
    truckId: '2',
    currentTruckMileage: 120000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  {
    id: '11',
    name: 'Austin to San Antonio',
    pickupCity: 'Austin, TX',
    dropoffCity: 'San Antonio, TX',
    dispatcherPercentage: 6,
    paymentAmount: 1500,
    fuelCost: 280,
    fuelGallons: 75,
    pricePerGallon: 3.73,
    miles: 80,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-12-15T09:30:00Z',
    updatedAt: '2023-12-15T12:15:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  // November 2023 loads
  {
    id: '12',
    name: 'Minneapolis to Milwaukee',
    pickupCity: 'Minneapolis, MN',
    dropoffCity: 'Milwaukee, WI',
    dispatcherPercentage: 9,
    paymentAmount: 2400,
    fuelCost: 460,
    fuelGallons: 120,
    pricePerGallon: 3.83,
    miles: 330,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-11-10T07:45:00Z',
    updatedAt: '2023-11-11T10:30:00Z',
    truckId: '2',
    currentTruckMileage: 120000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  {
    id: '13',
    name: 'Charlotte to Raleigh',
    pickupCity: 'Charlotte, NC',
    dropoffCity: 'Raleigh, NC',
    dispatcherPercentage: 7,
    paymentAmount: 1900,
    fuelCost: 370,
    fuelGallons: 95,
    pricePerGallon: 3.89,
    miles: 170,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-11-20T10:00:00Z',
    updatedAt: '2023-11-20T15:45:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  // October 2023 loads
  {
    id: '14',
    name: 'Portland to Seattle',
    pickupCity: 'Portland, OR',
    dropoffCity: 'Seattle, WA',
    dispatcherPercentage: 8,
    paymentAmount: 2100,
    fuelCost: 390,
    fuelGallons: 100,
    pricePerGallon: 3.90,
    miles: 174,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-10-05T08:30:00Z',
    updatedAt: '2023-10-06T11:15:00Z',
    truckId: '2',
    currentTruckMileage: 120000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  {
    id: '15',
    name: 'Kansas City to St. Louis',
    pickupCity: 'Kansas City, MO',
    dropoffCity: 'St. Louis, MO',
    dispatcherPercentage: 7,
    paymentAmount: 1800,
    fuelCost: 340,
    fuelGallons: 85,
    pricePerGallon: 4.00,
    miles: 250,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-10-15T09:15:00Z',
    updatedAt: '2023-10-15T16:30:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  // September 2023 loads
  {
    id: '16',
    name: 'Orlando to Tampa',
    pickupCity: 'Orlando, FL',
    dropoffCity: 'Tampa, FL',
    dispatcherPercentage: 6,
    paymentAmount: 1600,
    fuelCost: 310,
    fuelGallons: 80,
    pricePerGallon: 3.88,
    miles: 85,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-09-10T10:00:00Z',
    updatedAt: '2023-09-10T14:45:00Z',
    truckId: '2',
    currentTruckMileage: 120000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  {
    id: '17',
    name: 'Detroit to Cleveland',
    pickupCity: 'Detroit, MI',
    dropoffCity: 'Cleveland, OH',
    dispatcherPercentage: 8,
    paymentAmount: 2000,
    fuelCost: 380,
    fuelGallons: 95,
    pricePerGallon: 4.00,
    miles: 170,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-09-20T08:45:00Z',
    updatedAt: '2023-09-20T13:30:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  // August 2023 loads
  {
    id: '18',
    name: 'San Diego to Los Angeles',
    pickupCity: 'San Diego, CA',
    dropoffCity: 'Los Angeles, CA',
    dispatcherPercentage: 5,
    paymentAmount: 1400,
    fuelCost: 270,
    fuelGallons: 70,
    pricePerGallon: 3.86,
    miles: 120,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-08-05T09:30:00Z',
    updatedAt: '2023-08-05T12:15:00Z',
    truckId: '2',
    currentTruckMileage: 120000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  {
    id: '19',
    name: 'Philadelphia to Pittsburgh',
    pickupCity: 'Philadelphia, PA',
    dropoffCity: 'Pittsburgh, PA',
    dispatcherPercentage: 9,
    paymentAmount: 2200,
    fuelCost: 420,
    fuelGallons: 105,
    pricePerGallon: 4.00,
    miles: 305,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-08-15T07:15:00Z',
    updatedAt: '2023-08-16T10:45:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  // July 2023 loads
  {
    id: '20',
    name: 'Denver to Salt Lake City',
    pickupCity: 'Denver, CO',
    dropoffCity: 'Salt Lake City, UT',
    dispatcherPercentage: 10,
    paymentAmount: 2800,
    fuelCost: 530,
    fuelGallons: 135,
    pricePerGallon: 3.93,
    miles: 520,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-07-10T08:00:00Z',
    updatedAt: '2023-07-11T14:30:00Z',
    truckId: '2',
    currentTruckMileage: 120000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  {
    id: '21',
    name: 'Houston to Austin',
    pickupCity: 'Houston, TX',
    dropoffCity: 'Austin, TX',
    dispatcherPercentage: 7,
    paymentAmount: 1700,
    fuelCost: 330,
    fuelGallons: 85,
    pricePerGallon: 3.88,
    miles: 165,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-07-20T10:30:00Z',
    updatedAt: '2023-07-20T15:15:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  // June 2023 loads
  {
    id: '22',
    name: 'Las Vegas to Phoenix',
    pickupCity: 'Las Vegas, NV',
    dropoffCity: 'Phoenix, AZ',
    dispatcherPercentage: 8,
    paymentAmount: 1900,
    fuelCost: 360,
    fuelGallons: 90,
    pricePerGallon: 4.00,
    miles: 290,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-06-05T09:15:00Z',
    updatedAt: '2023-06-06T11:45:00Z',
    truckId: '2',
    currentTruckMileage: 120000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  {
    id: '23',
    name: 'Nashville to Memphis',
    pickupCity: 'Nashville, TN',
    dropoffCity: 'Memphis, TN',
    dispatcherPercentage: 7,
    paymentAmount: 1600,
    fuelCost: 310,
    fuelGallons: 80,
    pricePerGallon: 3.88,
    miles: 210,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-06-15T08:45:00Z',
    updatedAt: '2023-06-15T14:30:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  // May 2023 loads
  {
    id: '24',
    name: 'Boston to New York',
    pickupCity: 'Boston, MA',
    dropoffCity: 'New York, NY',
    dispatcherPercentage: 9,
    paymentAmount: 2100,
    fuelCost: 400,
    fuelGallons: 100,
    pricePerGallon: 4.00,
    miles: 215,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-05-10T07:30:00Z',
    updatedAt: '2023-05-10T12:15:00Z',
    truckId: '2',
    currentTruckMileage: 120000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  {
    id: '25',
    name: 'Chicago to Indianapolis',
    pickupCity: 'Chicago, IL',
    dropoffCity: 'Indianapolis, IN',
    dispatcherPercentage: 6,
    paymentAmount: 1500,
    fuelCost: 290,
    fuelGallons: 75,
    pricePerGallon: 3.87,
    miles: 185,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-05-20T10:00:00Z',
    updatedAt: '2023-05-20T15:45:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  // April 2023 loads
  {
    id: '26',
    name: 'Miami to Orlando',
    pickupCity: 'Miami, FL',
    dropoffCity: 'Orlando, FL',
    dispatcherPercentage: 7,
    paymentAmount: 1800,
    fuelCost: 350,
    fuelGallons: 90,
    pricePerGallon: 3.89,
    miles: 235,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-04-05T08:15:00Z',
    updatedAt: '2023-04-05T14:30:00Z',
    truckId: '2',
    currentTruckMileage: 120000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  {
    id: '27',
    name: 'Seattle to Portland',
    pickupCity: 'Seattle, WA',
    dropoffCity: 'Portland, OR',
    dispatcherPercentage: 8,
    paymentAmount: 1900,
    fuelCost: 370,
    fuelGallons: 95,
    pricePerGallon: 3.89,
    miles: 174,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-04-15T09:45:00Z',
    updatedAt: '2023-04-15T13:15:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  // March 2023 loads
  {
    id: '28',
    name: 'Dallas to Houston',
    pickupCity: 'Dallas, TX',
    dropoffCity: 'Houston, TX',
    dispatcherPercentage: 6,
    paymentAmount: 1700,
    fuelCost: 330,
    fuelGallons: 85,
    pricePerGallon: 3.88,
    miles: 240,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-03-10T10:30:00Z',
    updatedAt: '2023-03-10T16:45:00Z',
    truckId: '2',
    currentTruckMileage: 120000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  {
    id: '29',
    name: 'Atlanta to Nashville',
    pickupCity: 'Atlanta, GA',
    dropoffCity: 'Nashville, TN',
    dispatcherPercentage: 8,
    paymentAmount: 2000,
    fuelCost: 380,
    fuelGallons: 95,
    pricePerGallon: 4.00,
    miles: 250,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-03-20T08:00:00Z',
    updatedAt: '2023-03-20T12:30:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  // February 2023 loads
  {
    id: '30',
    name: 'New York to Boston',
    pickupCity: 'New York, NY',
    dropoffCity: 'Boston, MA',
    dispatcherPercentage: 7,
    paymentAmount: 1800,
    fuelCost: 350,
    fuelGallons: 90,
    pricePerGallon: 3.89,
    miles: 215,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-02-05T09:15:00Z',
    updatedAt: '2023-02-05T14:45:00Z',
    truckId: '2',
    currentTruckMileage: 120000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  {
    id: '31',
    name: 'Los Angeles to San Diego',
    pickupCity: 'Los Angeles, CA',
    dropoffCity: 'San Diego, CA',
    dispatcherPercentage: 5,
    paymentAmount: 1300,
    fuelCost: 250,
    fuelGallons: 65,
    pricePerGallon: 3.85,
    miles: 120,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-02-15T10:00:00Z',
    updatedAt: '2023-02-15T13:30:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  // January 2023 loads
  {
    id: '32',
    name: 'Portland to Seattle',
    pickupCity: 'Portland, OR',
    dropoffCity: 'Seattle, WA',
    dispatcherPercentage: 8,
    paymentAmount: 1900,
    fuelCost: 370,
    fuelGallons: 95,
    pricePerGallon: 3.89,
    miles: 174,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-01-10T08:45:00Z',
    updatedAt: '2023-01-10T12:15:00Z',
    truckId: '2',
    currentTruckMileage: 120000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  {
    id: '33',
    name: 'Chicago to Detroit',
    pickupCity: 'Chicago, IL',
    dropoffCity: 'Detroit, MI',
    dispatcherPercentage: 9,
    paymentAmount: 2100,
    fuelCost: 400,
    fuelGallons: 100,
    pricePerGallon: 4.00,
    miles: 280,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2023-01-20T09:30:00Z',
    updatedAt: '2023-01-20T15:45:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [],
    totalFuelCost: 0,
    totalFuelGallons: 0,
    averagePricePerGallon: 0,
    notes: 'Regular delivery',
  },
  {
    id: '34',
    name: 'LA to Chicago Express',
    pickupCity: 'Los Angeles, CA',
    dropoffCity: 'Chicago, IL',
    dispatcherPercentage: 12,
    paymentAmount: 5200,
    fuelCost: 950,
    fuelGallons: 280,
    pricePerGallon: 3.40,
    miles: 2000,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-17T15:30:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [
      {
        id: 'fs1',
        location: 'Denver, CO',
        gallons: 150,
        pricePerGallon: 3.45,
        totalCost: 517.50,
        date: '2025-01-15T14:30:00Z',
        notes: 'Regular fuel stop',
      },
      {
        id: 'fs2',
        location: 'Omaha, NE',
        gallons: 130,
        pricePerGallon: 3.35,
        totalCost: 435.50,
        date: '2025-01-16T10:15:00Z',
        notes: 'Final fuel stop before Chicago',
      },
    ],
    totalFuelCost: 950,
    totalFuelGallons: 280,
    averagePricePerGallon: 3.40,
    notes: 'Express delivery with time-sensitive cargo',
  },
  {
    id: '35',
    name: 'Miami to Boston Route',
    pickupCity: 'Miami, FL',
    dropoffCity: 'Boston, MA',
    dispatcherPercentage: 10,
    paymentAmount: 4800,
    fuelCost: 880,
    fuelGallons: 260,
    pricePerGallon: 3.38,
    miles: 1500,
    status: 'in-progress',
    paymentStatus: 'pending',
    createdAt: '2025-02-01T08:00:00Z',
    updatedAt: '2025-02-01T08:00:00Z',
    truckId: '2',
    currentTruckMileage: 120000,
    fuelStops: [
      {
        id: 'fs1',
        location: 'Richmond, VA',
        gallons: 140,
        pricePerGallon: 3.42,
        totalCost: 478.80,
        date: '2025-02-01T16:45:00Z',
        notes: 'Mid-route fuel stop',
      },
    ],
    totalFuelCost: 880,
    totalFuelGallons: 260,
    averagePricePerGallon: 3.38,
    notes: 'Coastal route delivery',
  },
  {
    id: '36',
    name: 'Seattle to Phoenix',
    pickupCity: 'Seattle, WA',
    dropoffCity: 'Phoenix, AZ',
    dispatcherPercentage: 11,
    paymentAmount: 5100,
    fuelCost: 920,
    fuelGallons: 270,
    pricePerGallon: 3.41,
    miles: 1800,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2025-02-15T09:00:00Z',
    updatedAt: '2025-02-15T09:00:00Z',
    truckId: '1',
    currentTruckMileage: 150000,
    fuelStops: [],
    totalFuelCost: 920,
    totalFuelGallons: 270,
    averagePricePerGallon: 3.41,
    notes: 'Temperature-controlled cargo',
  },
];

export const mockTrucks: Truck[] = [
  {
    id: '1',
    name: 'Thunder Road',
    make: 'Peterbilt',
    model: '579',
    year: 2022,
    vin: '1HGCM82633A123456',
    licensePlate: 'ABC123',
    mileage: 150000,
    oilChanges: [
      {
        id: '1',
        truckId: '1',
        miles: 145000,
        date: '2024-02-15',
        receiptUrl: '/receipts/oil-change-1.pdf',
      },
      {
        id: '2',
        truckId: '1',
        miles: 140000,
        date: '2024-01-15',
        receiptUrl: '/receipts/oil-change-2.pdf',
      },
    ],
    nextOilChangeDue: 155000,
    status: 'available',
    lastMaintenance: '2024-02-20',
    lastMaintenanceMileage: 145000,
    fuelEfficiency: 6.5,
    notes: 'Regular maintenance schedule',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    nextMaintenance: '2023-07-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Midnight Express',
    make: 'Kenworth',
    model: 'T680',
    year: 2021,
    vin: '2HGCM82633B789012',
    licensePlate: 'XYZ789',
    mileage: 120000,
    oilChanges: [
      {
        id: '3',
        truckId: '2',
        miles: 115000,
        date: '2024-02-01',
        receiptUrl: '/receipts/oil-change-3.pdf',
      },
      {
        id: '4',
        truckId: '2',
        miles: 110000,
        date: '2024-01-01',
        receiptUrl: '/receipts/oil-change-4.pdf',
      },
    ],
    nextOilChangeDue: 125000,
    status: 'maintenance',
    lastMaintenance: '2024-03-01',
    lastMaintenanceMileage: 115000,
    fuelEfficiency: 6.8,
    notes: 'Scheduled for brake inspection',
    createdAt: '2023-01-02T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z',
    nextMaintenance: '2023-08-01T00:00:00Z',
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'admin@otr.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    password: 'password123',
    phone: '(555) 123-4567',
    department: 'Operations',
    accessLevel: 'Full',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'driver@otr.com',
    role: 'driver',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    password: 'password123',
    phone: '(555) 987-6543',
    department: 'Drivers',
    accessLevel: 'Limited',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  }
];

export const mockDashboardStats: DashboardStats = {
  totalLoads: 45,
  totalMiles: 125000,
  totalEarnings: 185000,
  fuelUsage: [
    { date: '2024-03-01', gallons: 250, cost: 850 },
    { date: '2024-03-02', gallons: 200, cost: 680 },
    { date: '2024-03-03', gallons: 300, cost: 1020 },
    { date: '2024-03-04', gallons: 180, cost: 612 },
    { date: '2024-03-05', gallons: 220, cost: 748 },
  ],
  weeklyEarnings: [
    { week: '2024-W09', amount: 12500 },
    { week: '2024-W10', amount: 13800 },
    { week: '2024-W11', amount: 14200 },
    { week: '2024-W12', amount: 15600 },
  ],
  maintenanceAlerts: [
    {
      id: '1',
      truckId: '1',
      type: 'oil-change',
      dueDate: '2024-03-25',
      description: 'Oil change due in 500 miles',
    },
    {
      id: '2',
      truckId: '2',
      type: 'inspection',
      dueDate: '2024-04-01',
      description: 'Annual inspection due',
    },
  ],
  recentActivity: [
    {
      id: '1',
      type: 'load-completed',
      description: 'Load LA to NYC completed',
      timestamp: '2024-03-03T15:30:00Z',
    },
    {
      id: '2',
      type: 'maintenance',
      description: 'Oil change completed for Big Rig 2',
      timestamp: '2024-03-01T10:00:00Z',
    },
  ],
};

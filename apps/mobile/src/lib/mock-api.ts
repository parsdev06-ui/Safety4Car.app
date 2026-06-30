/**
 * Mock API layer for Safety4Car mobile app.
 * 
 * All functions simulate backend responses with realistic delays.
 * Function signatures match the planned NestJS API contracts.
 * 
 * When the backend is ready:
 * 1. Replace mock implementations with real HTTP calls via api-client.ts
 * 2. Keep the same function signatures for seamless migration
 * 3. Remove artificial delays
 */

import {
  packages,
  currentCustomer,
  currentInspector,
  vehicles,
  orders,
  inspectorOrders,
  defaultChecklist,
  inspections,
  reports,
  timeline,
  payouts,
} from './mock-data';
import {
  Package,
  Vehicle,
  Customer,
  Inspector,
  Order,
  ChecklistItem,
  Inspection,
  Report,
  Payout,
  TimelineEvent,
} from '../types';

/** Simulates network delay */
function delay(ms: number = 800): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function loginMock(email: string, _password: string): Promise<{ customer: Customer; token: string }> {
  await delay(1000);
  if (!email) throw new Error('E-Mail ist erforderlich');
  return { customer: currentCustomer, token: 'mock-jwt-token-customer' };
}

export async function loginInspectorMock(email: string, _password: string): Promise<{ inspector: Inspector; token: string }> {
  await delay(1000);
  if (!email) throw new Error('E-Mail ist erforderlich');
  return { inspector: currentInspector, token: 'mock-jwt-token-inspector' };
}

export async function registerMock(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}): Promise<{ customer: Customer; token: string }> {
  await delay(1200);
  if (!data.email || !data.password) throw new Error('E-Mail und Passwort sind erforderlich');
  const newCustomer: Customer = {
    id: 'cust-new',
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    city: 'Berlin',
  };
  return { customer: newCustomer, token: 'mock-jwt-token-new' };
}

// ─── Packages ────────────────────────────────────────────────────────────────

export async function getPackages(): Promise<Package[]> {
  await delay(600);
  return packages;
}

// ─── Customer Orders ─────────────────────────────────────────────────────────

export async function getCustomerOrders(): Promise<Order[]> {
  await delay(800);
  return orders;
}

export async function getOrderById(orderId: string): Promise<Order | undefined> {
  await delay(600);
  return orders.find(o => o.id === orderId) || inspectorOrders.find(o => o.id === orderId);
}

export async function getOrderTimeline(orderId: string): Promise<TimelineEvent[]> {
  await delay(500);
  return timeline.filter(t => t.orderId === orderId);
}

// ─── Vehicles ────────────────────────────────────────────────────────────────

export async function createVehicleDraft(data: Partial<Vehicle>): Promise<Vehicle> {
  await delay(800);
  const vehicle: Vehicle = {
    id: `veh-${Date.now()}`,
    vin: data.vin || '',
    licensePlate: data.licensePlate || '',
    make: data.make || '',
    model: data.model || '',
    year: data.year || new Date().getFullYear(),
    mileage: data.mileage || 0,
    fuelType: data.fuelType || 'Benzin',
    transmission: data.transmission || 'Manuell',
    color: data.color || '',
  };
  return vehicle;
}

// ─── Bookings ────────────────────────────────────────────────────────────────

export async function createBookingDraft(data: {
  vehicleId: string;
  packageId: string;
  appointmentDate?: string;
  appointmentTime?: string;
  appointmentLocation?: string;
}): Promise<Order> {
  await delay(1000);
  const order: Order = {
    id: `ord-${Date.now()}`,
    customerId: currentCustomer.id,
    vehicleId: data.vehicleId,
    packageId: data.packageId,
    status: 'payment_pending',
    totalPrice: packages.find(p => p.id === data.packageId)?.price || 0,
    currency: 'EUR',
    appointmentDate: data.appointmentDate,
    appointmentTime: data.appointmentTime,
    appointmentLocation: data.appointmentLocation,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return order;
}

// ─── Reports ─────────────────────────────────────────────────────────────────

export async function getReportById(reportId: string): Promise<Report | undefined> {
  await delay(700);
  return reports.find(r => r.id === reportId);
}

export async function getReportByOrder(orderId: string): Promise<Report | undefined> {
  await delay(700);
  return reports.find(r => r.orderId === orderId);
}

// ─── Inspector ───────────────────────────────────────────────────────────────

export async function getInspectorOrders(): Promise<Order[]> {
  await delay(800);
  return inspectorOrders;
}

export async function getInspectionById(inspectionId: string): Promise<Inspection | undefined> {
  await delay(600);
  return inspections.find(i => i.id === inspectionId);
}

export async function getInspectionByOrder(orderId: string): Promise<Inspection | undefined> {
  await delay(600);
  return inspections.find(i => i.orderId === orderId);
}

export async function getInspectionChecklist(): Promise<ChecklistItem[]> {
  await delay(500);
  return [...defaultChecklist];
}

export async function submitInspectionMock(data: {
  orderId: string;
  checklist: ChecklistItem[];
  photos: string[];
  notes: string;
  riskAssessment: string;
}): Promise<{ success: boolean; inspectionId: string }> {
  await delay(1500);
  if (data.checklist.some(item => item.status === 'pending')) {
    throw new Error('Alle Pflichtpunkte müssen bewertet werden');
  }
  return { success: true, inspectionId: `ins-${Date.now()}` };
}

// ─── Support ─────────────────────────────────────────────────────────────────

export async function createComplaintMock(data: {
  orderId?: string;
  subject: string;
  description: string;
  contactEmail: string;
}): Promise<{ success: boolean; ticketId: string }> {
  await delay(1000);
  if (!data.subject || !data.description) {
    throw new Error('Betreff und Beschreibung sind erforderlich');
  }
  return { success: true, ticketId: `ticket-${Date.now()}` };
}

// ─── Payouts ─────────────────────────────────────────────────────────────────

export async function getInspectorPayouts(): Promise<Payout[]> {
  await delay(700);
  return payouts;
}

/**
 * Safety4Car API Client
 *
 * This module provides a prepared API client for connecting to the NestJS backend.
 * Currently returns mock data. When the backend is ready, replace mock returns
 * with actual HTTP calls.
 *
 * TODO: connect to NestJS backend
 */

import {
  orders,
  customers,
  vehicles,
  packages,
  partners,
  inspectors,
  inspections,
  reports,
  payments,
  complaints,
  tickets,
  auditLogs,
  getOrderById,
  getCustomerById,
  getVehicleById,
  getPackageById,
  getPartnerById,
  getInspectorById,
  getInspectionByOrderId,
  getReportByOrderId,
  getPaymentByOrderId,
} from './mock-data';

import type {
  Order,
  Customer,
  Vehicle,
  Package,
  Partner,
  Inspector,
  Inspection,
  Report,
  Payment,
  Complaint,
  Ticket,
  AuditLog,
} from '@/types';

// TODO: Replace with actual API base URL
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Simulates network delay for realistic mock behavior
 */
async function delay(ms: number = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export async function getOrders(): Promise<Order[]> {
  await delay();
  return orders;
}

export async function fetchOrderById(id: string): Promise<Order | undefined> {
  await delay();
  return getOrderById(id);
}

export async function createOrder(data: Partial<Order>): Promise<Order> {
  await delay();
  const newOrder: Order = {
    id: `ord-${Date.now()}`,
    customerId: data.customerId || 'cust-1',
    vehicleId: data.vehicleId || 'veh-1',
    packageId: data.packageId || 'pkg-1',
    status: 'draft',
    totalPrice: data.totalPrice || 0,
    currency: 'EUR',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data,
  };
  return newOrder;
}

// ─── Customers ───────────────────────────────────────────────────────────────

export async function getCustomers(): Promise<Customer[]> {
  await delay();
  return customers;
}

export async function fetchCustomerById(id: string): Promise<Customer | undefined> {
  await delay();
  return getCustomerById(id);
}

// ─── Vehicles ────────────────────────────────────────────────────────────────

export async function getVehicles(): Promise<Vehicle[]> {
  await delay();
  return vehicles;
}

export async function fetchVehicleById(id: string): Promise<Vehicle | undefined> {
  await delay();
  return getVehicleById(id);
}

export async function createVehicle(data: Partial<Vehicle>): Promise<Vehicle> {
  await delay();
  const newVehicle: Vehicle = {
    id: `veh-${Date.now()}`,
    vin: data.vin || '',
    licensePlate: data.licensePlate || '',
    make: data.make || '',
    model: data.model || '',
    year: data.year || new Date().getFullYear(),
    mileage: data.mileage || 0,
    fuelType: data.fuelType || '',
    transmission: data.transmission || '',
    bodyType: data.bodyType || '',
    color: data.color || '',
    registrationDate: data.registrationDate || '',
    ...data,
  };
  return newVehicle;
}

// ─── Packages ────────────────────────────────────────────────────────────────

export async function getPackages(): Promise<Package[]> {
  await delay();
  return packages;
}

export async function fetchPackageById(id: string): Promise<Package | undefined> {
  await delay();
  return getPackageById(id);
}

// ─── Partners ────────────────────────────────────────────────────────────────

export async function getPartners(): Promise<Partner[]> {
  await delay();
  return partners;
}

export async function fetchPartnerById(id: string): Promise<Partner | undefined> {
  await delay();
  return getPartnerById(id);
}

// ─── Inspectors ──────────────────────────────────────────────────────────────

export async function getInspectors(): Promise<Inspector[]> {
  await delay();
  return inspectors;
}

export async function fetchInspectorById(id: string): Promise<Inspector | undefined> {
  await delay();
  return getInspectorById(id);
}

// ─── Inspections ─────────────────────────────────────────────────────────────

export async function getInspections(): Promise<Inspection[]> {
  await delay();
  return inspections;
}

export async function fetchInspectionByOrderId(orderId: string): Promise<Inspection | undefined> {
  await delay();
  return getInspectionByOrderId(orderId);
}

export async function submitInspection(inspectionId: string): Promise<{ success: boolean }> {
  await delay(500);
  // TODO: POST /api/inspections/:id/submit
  return { success: true };
}

// ─── Reports ─────────────────────────────────────────────────────────────────

export async function getReports(): Promise<Report[]> {
  await delay();
  return reports;
}

export async function fetchReportByOrderId(orderId: string): Promise<Report | undefined> {
  await delay();
  return getReportByOrderId(orderId);
}

// ─── Payments ────────────────────────────────────────────────────────────────

export async function getPayments(): Promise<Payment[]> {
  await delay();
  return payments;
}

export async function fetchPaymentByOrderId(orderId: string): Promise<Payment | undefined> {
  await delay();
  return getPaymentByOrderId(orderId);
}

export async function startCheckout(orderId: string): Promise<{ success: boolean; redirectUrl: string }> {
  await delay(500);
  // TODO: POST /api/payments/checkout
  return { success: true, redirectUrl: '/booking/success' };
}

// ─── Complaints ──────────────────────────────────────────────────────────────

export async function getComplaints(): Promise<Complaint[]> {
  await delay();
  return complaints;
}

export async function createComplaint(data: Partial<Complaint>): Promise<Complaint> {
  await delay();
  const newComplaint: Complaint = {
    id: `comp-${Date.now()}`,
    orderId: data.orderId || '',
    customerId: data.customerId || '',
    subject: data.subject || '',
    description: data.description || '',
    status: 'open',
    priority: data.priority || 'medium',
    createdAt: new Date().toISOString(),
    ...data,
  };
  return newComplaint;
}

// ─── Tickets ─────────────────────────────────────────────────────────────────

export async function getTickets(): Promise<Ticket[]> {
  await delay();
  return tickets;
}

export async function fetchTicketById(id: string): Promise<Ticket | undefined> {
  await delay();
  return tickets.find((t) => t.id === id);
}

// ─── Audit Logs ──────────────────────────────────────────────────────────────

export async function getAuditLogs(): Promise<AuditLog[]> {
  await delay();
  return auditLogs;
}

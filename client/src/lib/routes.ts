/**
 * Safety4Car Route Constants
 *
 * Centralized route definitions for all application paths.
 */

export const ROUTES = {
  // Public
  HOME: '/',
  PRICING: '/preise',
  HOW_IT_WORKS: '/so-funktionierts',

  // Booking Flow
  BOOKING_PACKAGE: '/booking/package',
  BOOKING_VEHICLE: '/booking/vehicle',
  BOOKING_APPOINTMENT: '/booking/appointment',
  BOOKING_CHECKOUT: '/booking/checkout-preview',
  BOOKING_SUCCESS: '/booking/success',

  // Customer
  CUSTOMER_DASHBOARD: '/customer/dashboard',
  CUSTOMER_ORDER: (id: string) => `/customer/orders/${id}`,
  CUSTOMER_REPORT: (id: string) => `/customer/reports/${id}`,
  CUSTOMER_COMPLAINT: '/customer/complaint',

  // Inspector
  INSPECTOR_DASHBOARD: '/inspector/dashboard',
  INSPECTOR_ORDERS: '/inspector/orders',
  INSPECTOR_ORDER: (id: string) => `/inspector/orders/${id}`,
  INSPECTOR_INSPECTION: (id: string) => `/inspector/inspection/${id}`,
  INSPECTOR_INSPECTION_SUBMIT: (id: string) => `/inspector/inspection/${id}/submit`,

  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_ORDER: (id: string) => `/admin/orders/${id}`,
  ADMIN_PARTNERS: '/admin/partners',
  ADMIN_PARTNER: (id: string) => `/admin/partners/${id}`,
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_PAYMENTS: '/admin/payments',
  ADMIN_COMPLAINTS: '/admin/complaints',
  ADMIN_AUDIT_LOGS: '/admin/audit-logs',

  // Customer Success
  CS_DASHBOARD: '/cs/dashboard',
  CS_TICKETS: '/cs/tickets',
  CS_TICKET: (id: string) => `/cs/tickets/${id}`,
  CS_CUSTOMERS: '/cs/customers',
  CS_ORDERS: '/cs/orders',
  CS_COMPLAINTS: '/cs/complaints',
} as const;

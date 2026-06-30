/**
 * API Route definitions for Safety4Car backend integration.
 * Currently used with mock data only.
 * When backend is ready, these routes map to NestJS endpoints.
 */

export const API_BASE_URL = 'https://api.safety4car.de/v1';

export const ROUTES = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',

  // Packages
  PACKAGES: '/packages',
  PACKAGE_BY_ID: (id: string) => `/packages/${id}`,

  // Customer
  CUSTOMER_PROFILE: '/customer/profile',
  CUSTOMER_ORDERS: '/customer/orders',
  CUSTOMER_ORDER_BY_ID: (id: string) => `/customer/orders/${id}`,

  // Vehicles
  VEHICLES: '/vehicles',
  VEHICLE_BY_ID: (id: string) => `/vehicles/${id}`,

  // Bookings
  BOOKINGS: '/bookings',
  BOOKING_BY_ID: (id: string) => `/bookings/${id}`,

  // Reports
  REPORTS: '/reports',
  REPORT_BY_ID: (id: string) => `/reports/${id}`,
  REPORT_BY_ORDER: (orderId: string) => `/reports/order/${orderId}`,

  // Inspector
  INSPECTOR_PROFILE: '/inspector/profile',
  INSPECTOR_ORDERS: '/inspector/orders',
  INSPECTOR_ORDER_BY_ID: (id: string) => `/inspector/orders/${id}`,
  INSPECTOR_INSPECTIONS: '/inspector/inspections',
  INSPECTION_BY_ID: (id: string) => `/inspector/inspections/${id}`,
  SUBMIT_INSPECTION: (id: string) => `/inspector/inspections/${id}/submit`,

  // Payouts
  INSPECTOR_PAYOUTS: '/inspector/payouts',

  // Support
  COMPLAINTS: '/support/complaints',
  COMPLAINT_BY_ID: (id: string) => `/support/complaints/${id}`,
} as const;

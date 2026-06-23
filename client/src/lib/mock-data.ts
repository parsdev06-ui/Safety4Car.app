import {
  Package,
  Vehicle,
  Customer,
  Inspector,
  Partner,
  Order,
  Inspection,
  Report,
  Payment,
  Complaint,
  Ticket,
  AuditLog,
} from '@/types';

// Packages
export const packages: Package[] = [
  {
    id: 'pkg-1',
    name: 'Self-Check',
    type: 'self_check',
    price: 72,
    currency: 'EUR',
    description: 'Basic vehicle self-assessment with digital checklist',
    features: ['Digital checklist', 'Photo upload', 'Basic report'],
    estimatedDuration: 1,
  },
  {
    id: 'pkg-2',
    name: 'Basic Check',
    type: 'basic_check',
    price: 120,
    currency: 'EUR',
    description: 'Professional inspection by certified inspector',
    features: ['Professional inspection', 'Detailed report', 'Photo documentation', 'Risk assessment'],
    estimatedDuration: 2,
  },
  {
    id: 'pkg-3',
    name: 'Premium Check',
    type: 'premium_check',
    price: 300,
    currency: 'EUR',
    description: 'Comprehensive inspection with detailed analysis',
    features: ['Comprehensive inspection', 'Expert analysis', 'Video documentation', 'Detailed recommendations', 'Priority support'],
    estimatedDuration: 3,
  },
];

// Customers
export const customers: Customer[] = [
  {
    id: 'cust-1',
    firstName: 'Max',
    lastName: 'Mueller',
    email: 'max.mueller@example.com',
    phone: '+49 30 123456',
    address: 'Hauptstrasse 42',
    city: 'Berlin',
    postalCode: '10115',
    country: 'Germany',
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'cust-2',
    firstName: 'Anna',
    lastName: 'Schmidt',
    email: 'anna.schmidt@example.com',
    phone: '+49 89 654321',
    address: 'Marienplatz 1',
    city: 'Munich',
    postalCode: '80331',
    country: 'Germany',
    createdAt: '2025-02-20T14:30:00Z',
  },
  {
    id: 'cust-3',
    firstName: 'Thomas',
    lastName: 'Weber',
    email: 'thomas.weber@example.com',
    phone: '+49 221 987654',
    address: 'Rheinstrasse 10',
    city: 'Cologne',
    postalCode: '50667',
    country: 'Germany',
    createdAt: '2025-03-05T09:15:00Z',
  },
];

// Vehicles
export const vehicles: Vehicle[] = [
  {
    id: 'veh-1',
    vin: 'WBADT43452G915234',
    licensePlate: 'B-AB-123',
    make: 'BMW',
    model: '3 Series',
    year: 2019,
    mileage: 45000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    color: 'Silver',
    registrationDate: '2019-06-15',
  },
  {
    id: 'veh-2',
    vin: 'WVWZZZ3CZ9E123456',
    licensePlate: 'M-CD-456',
    make: 'Volkswagen',
    model: 'Golf',
    year: 2020,
    mileage: 32000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    bodyType: 'Hatchback',
    color: 'Blue',
    registrationDate: '2020-03-20',
  },
  {
    id: 'veh-3',
    vin: 'WBA1F5C51LV123456',
    licensePlate: 'K-EF-789',
    make: 'BMW',
    model: 'X5',
    year: 2021,
    mileage: 28000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Black',
    registrationDate: '2021-01-10',
  },
];

// Partners
export const partners: Partner[] = [
  {
    id: 'partner-1',
    name: 'Berlin Auto Inspectors',
    email: 'contact@berlin-auto.de',
    phone: '+49 30 555555',
    address: 'Friedrichstrasse 100',
    city: 'Berlin',
    postalCode: '10117',
    country: 'Germany',
    website: 'www.berlin-auto.de',
    inspectorCount: 12,
    averageRating: 4.8,
    completedInspections: 342,
    status: 'active',
    joinedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'partner-2',
    name: 'Munich Automotive Services',
    email: 'info@munich-auto.de',
    phone: '+49 89 777777',
    address: 'Sendlinger Tor 1',
    city: 'Munich',
    postalCode: '80331',
    country: 'Germany',
    website: 'www.munich-auto.de',
    inspectorCount: 8,
    averageRating: 4.6,
    completedInspections: 218,
    status: 'active',
    joinedAt: '2024-02-20T00:00:00Z',
  },
];

// Inspectors
export const inspectors: Inspector[] = [
  {
    id: 'insp-1',
    firstName: 'Klaus',
    lastName: 'Bauer',
    email: 'klaus.bauer@berlin-auto.de',
    phone: '+49 30 111111',
    partnerId: 'partner-1',
    certifications: ['TÜV', 'ASU', 'HU'],
    rating: 4.9,
    completedInspections: 156,
    status: 'active',
    joinedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: 'insp-2',
    firstName: 'Petra',
    lastName: 'Keller',
    email: 'petra.keller@munich-auto.de',
    phone: '+49 89 222222',
    partnerId: 'partner-2',
    certifications: ['TÜV', 'ASU'],
    rating: 4.7,
    completedInspections: 98,
    status: 'active',
    joinedAt: '2024-02-25T00:00:00Z',
  },
];

// Orders
export const orders: Order[] = [
  {
    id: 'ord-1',
    customerId: 'cust-1',
    vehicleId: 'veh-1',
    packageId: 'pkg-2',
    partnerId: 'partner-1',
    inspectorId: 'insp-1',
    status: 'completed',
    totalPrice: 120,
    currency: 'EUR',
    appointmentDate: '2025-06-20',
    appointmentTime: '10:00',
    appointmentLocation: 'Berlin Auto Inspectors, Friedrichstrasse 100',
    notes: 'Customer requested thorough brake system inspection',
    createdAt: '2025-06-15T08:00:00Z',
    updatedAt: '2025-06-20T12:30:00Z',
    completedAt: '2025-06-20T12:30:00Z',
  },
  {
    id: 'ord-2',
    customerId: 'cust-2',
    vehicleId: 'veh-2',
    packageId: 'pkg-3',
    partnerId: 'partner-2',
    inspectorId: 'insp-2',
    status: 'inspection_in_progress',
    totalPrice: 300,
    currency: 'EUR',
    appointmentDate: '2025-06-23',
    appointmentTime: '14:00',
    appointmentLocation: 'Munich Automotive Services, Sendlinger Tor 1',
    notes: 'Premium check requested',
    createdAt: '2025-06-18T10:30:00Z',
    updatedAt: '2025-06-23T14:15:00Z',
  },
  {
    id: 'ord-3',
    customerId: 'cust-3',
    vehicleId: 'veh-3',
    packageId: 'pkg-2',
    status: 'appointment_confirmed',
    totalPrice: 120,
    currency: 'EUR',
    appointmentDate: '2025-06-25',
    appointmentTime: '09:00',
    appointmentLocation: 'Berlin Auto Inspectors, Friedrichstrasse 100',
    createdAt: '2025-06-22T11:00:00Z',
    updatedAt: '2025-06-22T15:45:00Z',
  },
];

// Inspections
export const inspections: Inspection[] = [
  {
    id: 'insp-data-1',
    orderId: 'ord-1',
    inspectorId: 'insp-1',
    status: 'submitted',
    startedAt: '2025-06-20T10:00:00Z',
    completedAt: '2025-06-20T12:30:00Z',
    checklist: [
      {
        id: 'check-1',
        category: 'Engine',
        name: 'Engine Oil Level',
        description: 'Check engine oil level and condition',
        status: 'pass',
        notes: 'Oil level normal, color good',
      },
      {
        id: 'check-2',
        category: 'Brakes',
        name: 'Brake Pads',
        description: 'Inspect brake pad thickness',
        status: 'warning',
        notes: 'Brake pads at 3mm, recommend replacement within 5000km',
      },
      {
        id: 'check-3',
        category: 'Tires',
        name: 'Tire Condition',
        description: 'Check tire tread and condition',
        status: 'pass',
        notes: 'Tires in good condition, 6mm tread depth',
      },
    ],
    photos: [],
    notes: 'Vehicle in good overall condition. Minor brake pad wear noted.',
    riskAssessment: 'low',
  },
  {
    id: 'insp-data-2',
    orderId: 'ord-2',
    inspectorId: 'insp-2',
    status: 'submitted',
    startedAt: '2025-06-23T14:00:00Z',
    checklist: [
      {
        id: 'check-4',
        category: 'Engine',
        name: 'Engine Oil Level',
        description: 'Check engine oil level and condition',
        status: 'pending',
      },
      {
        id: 'check-5',
        category: 'Suspension',
        name: 'Suspension Components',
        description: 'Inspect suspension for wear and damage',
        status: 'pending',
      },
    ],
    photos: [],
    notes: 'Inspection in progress',
    riskAssessment: 'medium',
  },
];

// Reports
export const reports: Report[] = [
  {
    id: 'rep-1',
    orderId: 'ord-1',
    inspectionId: 'insp-data-1',
    customerId: 'cust-1',
    vehicleId: 'veh-1',
    status: 'approved',
    riskLevel: 'low',
    summary: 'BMW 3 Series in good overall condition with minor maintenance recommendations.',
    findings: [
      {
        id: 'find-1',
        category: 'Brakes',
        severity: 'medium',
        description: 'Brake pads showing wear at 3mm thickness',
        recommendation: 'Replace brake pads within next 5000km',
      },
      {
        id: 'find-2',
        category: 'Fluids',
        severity: 'low',
        description: 'Engine oil level normal',
        recommendation: 'Continue regular oil change schedule',
      },
    ],
    recommendations: [
      'Schedule brake pad replacement',
      'Continue regular maintenance',
      'Next service due at 50000km',
    ],
    generatedAt: '2025-06-20T13:00:00Z',
    approvedAt: '2025-06-20T14:30:00Z',
    approvedBy: 'admin-1',
  },
];

// Payments
export const payments: Payment[] = [
  {
    id: 'pay-1',
    orderId: 'ord-1',
    customerId: 'cust-1',
    amount: 120,
    currency: 'EUR',
    status: 'completed',
    method: 'credit_card',
    transactionId: 'txn_1234567890',
    createdAt: '2025-06-15T08:30:00Z',
    completedAt: '2025-06-15T08:35:00Z',
  },
  {
    id: 'pay-2',
    orderId: 'ord-2',
    customerId: 'cust-2',
    amount: 300,
    currency: 'EUR',
    status: 'completed',
    method: 'credit_card',
    transactionId: 'txn_0987654321',
    createdAt: '2025-06-18T10:45:00Z',
    completedAt: '2025-06-18T10:50:00Z',
  },
];

// Complaints
export const complaints: Complaint[] = [
  {
    id: 'comp-1',
    orderId: 'ord-1',
    customerId: 'cust-1',
    subject: 'Inspection took longer than expected',
    description: 'The inspection was scheduled for 2 hours but took 2.5 hours',
    status: 'resolved',
    priority: 'low',
    createdAt: '2025-06-20T13:00:00Z',
    resolvedAt: '2025-06-21T10:00:00Z',
    resolution: 'Inspector provided detailed explanation. Issue resolved.',
  },
];

// Tickets
export const tickets: Ticket[] = [
  {
    id: 'ticket-1',
    customerId: 'cust-1',
    subject: 'Question about report findings',
    description: 'Can you explain the brake pad wear in more detail?',
    status: 'resolved',
    priority: 'medium',
    assignedTo: 'cs-1',
    createdAt: '2025-06-20T14:00:00Z',
    updatedAt: '2025-06-21T09:30:00Z',
    resolvedAt: '2025-06-21T09:30:00Z',
  },
  {
    id: 'ticket-2',
    customerId: 'cust-2',
    subject: 'Appointment rescheduling request',
    description: 'Need to reschedule appointment to next week',
    status: 'open',
    priority: 'high',
    createdAt: '2025-06-22T11:00:00Z',
    updatedAt: '2025-06-22T11:00:00Z',
  },
];

// Audit Logs
export const auditLogs: AuditLog[] = [
  {
    id: 'audit-1',
    userId: 'insp-1',
    userRole: 'inspector',
    action: 'completed_inspection',
    resourceType: 'inspection',
    resourceId: 'insp-data-1',
    changes: { status: 'completed' },
    timestamp: '2025-06-20T12:30:00Z',
  },
  {
    id: 'audit-2',
    userId: 'admin-1',
    userRole: 'admin',
    action: 'approved_report',
    resourceType: 'report',
    resourceId: 'rep-1',
    changes: { status: 'approved' },
    timestamp: '2025-06-20T14:30:00Z',
  },
  {
    id: 'audit-3',
    userId: 'cust-2',
    userRole: 'customer',
    action: 'created_order',
    resourceType: 'order',
    resourceId: 'ord-2',
    changes: { status: 'draft' },
    timestamp: '2025-06-18T10:30:00Z',
  },
];

// Helper functions
export const getOrderById = (id: string) => orders.find(o => o.id === id);
export const getCustomerById = (id: string) => customers.find(c => c.id === id);
export const getVehicleById = (id: string) => vehicles.find(v => v.id === id);
export const getInspectorById = (id: string) => inspectors.find(i => i.id === id);
export const getPartnerById = (id: string) => partners.find(p => p.id === id);
export const getPackageById = (id: string) => packages.find(p => p.id === id);
export const getInspectionByOrderId = (orderId: string) => inspections.find(i => i.orderId === orderId);
export const getReportByOrderId = (orderId: string) => reports.find(r => r.orderId === orderId);
export const getPaymentByOrderId = (orderId: string) => payments.find(p => p.orderId === orderId);
export const getTicketsByCustomerId = (customerId: string) => tickets.filter(t => t.customerId === customerId);
export const getComplaintsByCustomerId = (customerId: string) => complaints.filter(c => c.customerId === customerId);
export const getOrdersByCustomerId = (customerId: string) => orders.filter(o => o.customerId === customerId);
export const getOrdersByPartnerId = (partnerId: string) => orders.filter(o => o.partnerId === partnerId);
export const getOrdersByInspectorId = (inspectorId: string) => orders.filter(o => o.inspectorId === inspectorId);

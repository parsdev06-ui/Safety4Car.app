// Order Status Types
export type OrderStatus = 
  | 'draft'
  | 'payment_pending'
  | 'paid'
  | 'partner_matching'
  | 'partner_assigned'
  | 'appointment_confirmed'
  | 'inspection_ready'
  | 'inspection_in_progress'
  | 'report_pending'
  | 'qa_review'
  | 'completed'
  | 'payout_pending'
  | 'payout_completed'
  | 'cancelled'
  | 'refunded'
  | 'disputed'
  | 'complaint_open';

export type PackageType = 'self_check' | 'basic_check' | 'premium_check';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type InspectionStatus = 'pending' | 'in_progress' | 'submitted' | 'approved' | 'rejected';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

// Domain Models
export interface Package {
  id: string;
  name: string;
  type: PackageType;
  price: number;
  currency: string;
  description: string;
  features: string[];
  estimatedDuration: number; // in hours
}

export interface Vehicle {
  id: string;
  vin: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  color: string;
  registrationDate: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  createdAt: string;
}

export interface Inspector {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  partnerId: string;
  certifications: string[];
  rating: number;
  completedInspections: number;
  status: 'active' | 'inactive' | 'on_leave';
  joinedAt: string;
}

export interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  website?: string;
  inspectorCount: number;
  averageRating: number;
  completedInspections: number;
  status: 'active' | 'inactive' | 'pending_verification';
  joinedAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  vehicleId: string;
  packageId: string;
  partnerId?: string;
  inspectorId?: string;
  status: OrderStatus;
  totalPrice: number;
  currency: string;
  appointmentDate?: string;
  appointmentTime?: string;
  appointmentLocation?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface Inspection {
  id: string;
  orderId: string;
  inspectorId: string;
  status: InspectionStatus;
  startedAt?: string;
  completedAt?: string;
  checklist: ChecklistItem[];
  photos: InspectionPhoto[];
  notes: string;
  riskAssessment: RiskLevel;
}

export interface ChecklistItem {
  id: string;
  category: string;
  name: string;
  description: string;
  status: 'pending' | 'pass' | 'fail' | 'warning';
  notes?: string;
  photoIds?: string[];
}

export interface InspectionPhoto {
  id: string;
  checklistItemId: string;
  url: string;
  caption?: string;
  uploadedAt: string;
}

export interface Report {
  id: string;
  orderId: string;
  inspectionId: string;
  customerId: string;
  vehicleId: string;
  status: 'draft' | 'pending_review' | 'approved' | 'rejected';
  riskLevel: RiskLevel;
  summary: string;
  findings: ReportFinding[];
  recommendations: string[];
  generatedAt: string;
  approvedAt?: string;
  approvedBy?: string;
}

export interface ReportFinding {
  id: string;
  category: string;
  severity: RiskLevel;
  description: string;
  recommendation: string;
  photoUrl?: string;
}

export interface Payment {
  id: string;
  orderId: string;
  customerId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'credit_card' | 'bank_transfer' | 'paypal';
  transactionId: string;
  createdAt: string;
  completedAt?: string;
}

export interface Complaint {
  id: string;
  orderId: string;
  customerId: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: TicketPriority;
  createdAt: string;
  resolvedAt?: string;
  resolution?: string;
}

export interface Ticket {
  id: string;
  customerId: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userRole: 'admin' | 'customer_success' | 'inspector' | 'partner' | 'customer';
  action: string;
  resourceType: string;
  resourceId: string;
  changes: Record<string, any>;
  timestamp: string;
  ipAddress?: string;
}

export interface Appointment {
  id: string;
  orderId: string;
  date: string;
  time: string;
  location: string;
  duration: number; // in minutes
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface DashboardMetric {
  label: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: string;
}

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

export interface Package {
  id: string;
  name: string;
  type: PackageType;
  price: number;
  currency: string;
  description: string;
  features: string[];
  estimatedDuration: number;
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
  color: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
}

export interface Inspector {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  certifications: string[];
  rating: number;
  completedInspections: number;
  status: 'active' | 'inactive' | 'on_leave';
}

export interface Order {
  id: string;
  customerId: string;
  vehicleId: string;
  packageId: string;
  inspectorId?: string;
  status: OrderStatus;
  totalPrice: number;
  currency: string;
  appointmentDate?: string;
  appointmentTime?: string;
  appointmentLocation?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface ChecklistItem {
  id: string;
  category: string;
  name: string;
  description: string;
  status: 'pending' | 'pass' | 'fail' | 'warning';
  notes?: string;
}

export interface Inspection {
  id: string;
  orderId: string;
  inspectorId: string;
  status: InspectionStatus;
  startedAt?: string;
  completedAt?: string;
  checklist: ChecklistItem[];
  photos: string[];
  notes: string;
  riskAssessment: RiskLevel;
}

export interface ReportFinding {
  id: string;
  category: string;
  severity: RiskLevel;
  description: string;
  recommendation: string;
}

export interface Report {
  id: string;
  orderId: string;
  inspectionId: string;
  riskLevel: RiskLevel;
  summary: string;
  findings: ReportFinding[];
  recommendations: string[];
  generatedAt: string;
}

export interface Payout {
  id: string;
  orderId: string;
  inspectorId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  orderId: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'current' | 'upcoming';
}

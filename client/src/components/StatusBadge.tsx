import { Badge } from '@/components/ui/badge';
import { OrderStatus, RiskLevel, InspectionStatus, TicketStatus } from '@/types';

const statusColorMap: Record<OrderStatus, string> = {
  draft: 'bg-gray-100 text-gray-800',
  payment_pending: 'bg-amber-100 text-amber-800',
  paid: 'bg-blue-100 text-blue-800',
  partner_matching: 'bg-purple-100 text-purple-800',
  partner_assigned: 'bg-purple-100 text-purple-800',
  appointment_confirmed: 'bg-blue-100 text-blue-800',
  inspection_ready: 'bg-cyan-100 text-cyan-800',
  inspection_in_progress: 'bg-cyan-100 text-cyan-800',
  report_pending: 'bg-yellow-100 text-yellow-800',
  qa_review: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-emerald-100 text-emerald-800',
  payout_pending: 'bg-yellow-100 text-yellow-800',
  payout_completed: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-red-100 text-red-800',
  disputed: 'bg-red-100 text-red-800',
  complaint_open: 'bg-red-100 text-red-800',
};

const statusLabelMap: Record<OrderStatus, string> = {
  draft: 'Entwurf',
  payment_pending: 'Zahlung ausstehend',
  paid: 'Bezahlt',
  partner_matching: 'Partner wird gesucht',
  partner_assigned: 'Partner zugewiesen',
  appointment_confirmed: 'Termin bestätigt',
  inspection_ready: 'Bereit zur Inspektion',
  inspection_in_progress: 'Inspektion läuft',
  report_pending: 'Report ausstehend',
  qa_review: 'QA-Überprüfung',
  completed: 'Abgeschlossen',
  payout_pending: 'Auszahlung ausstehend',
  payout_completed: 'Auszahlung abgeschlossen',
  cancelled: 'Storniert',
  refunded: 'Rückerstattung',
  disputed: 'Streitfall',
  complaint_open: 'Beschwerde offen',
};

const riskColorMap: Record<RiskLevel, string> = {
  low: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
};

const riskLabelMap: Record<RiskLevel, string> = {
  low: 'Niedrig',
  medium: 'Mittel',
  high: 'Hoch',
  critical: 'Kritisch',
};

const inspectionStatusColorMap: Record<InspectionStatus, string> = {
  pending: 'bg-gray-100 text-gray-800',
  in_progress: 'bg-cyan-100 text-cyan-800',
  submitted: 'bg-blue-100 text-blue-800',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800',
};

const inspectionStatusLabelMap: Record<InspectionStatus, string> = {
  pending: 'Ausstehend',
  in_progress: 'Läuft',
  submitted: 'Eingereicht',
  approved: 'Genehmigt',
  rejected: 'Abgelehnt',
};

const ticketStatusColorMap: Record<TicketStatus, string> = {
  open: 'bg-red-100 text-red-800',
  in_progress: 'bg-cyan-100 text-cyan-800',
  resolved: 'bg-emerald-100 text-emerald-800',
  closed: 'bg-gray-100 text-gray-800',
};

const ticketStatusLabelMap: Record<TicketStatus, string> = {
  open: 'Offen',
  in_progress: 'In Bearbeitung',
  resolved: 'Gelöst',
  closed: 'Geschlossen',
};

interface StatusBadgeProps {
  status: OrderStatus | InspectionStatus | TicketStatus;
  type?: 'order' | 'inspection' | 'ticket';
}

interface RiskBadgeProps {
  level: RiskLevel;
}

export function StatusBadge({ status, type = 'order' }: StatusBadgeProps) {
  let colorClass = '';
  let label = '';

  if (type === 'order') {
    colorClass = statusColorMap[status as OrderStatus];
    label = statusLabelMap[status as OrderStatus];
  } else if (type === 'inspection') {
    colorClass = inspectionStatusColorMap[status as InspectionStatus];
    label = inspectionStatusLabelMap[status as InspectionStatus];
  } else if (type === 'ticket') {
    colorClass = ticketStatusColorMap[status as TicketStatus];
    label = ticketStatusLabelMap[status as TicketStatus];
  }

  return (
    <Badge className={`${colorClass} font-medium`}>
      {label}
    </Badge>
  );
}

export function RiskBadge({ level }: RiskBadgeProps) {
  const colorClass = riskColorMap[level];
  const label = riskLabelMap[level];

  return (
    <Badge className={`${colorClass} font-medium`}>
      {label}
    </Badge>
  );
}

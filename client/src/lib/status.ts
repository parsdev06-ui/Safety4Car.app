/**
 * Safety4Car Status Utilities
 *
 * Centralized status labels and color mappings.
 */

import type { OrderStatus, RiskLevel } from '@/types';

// ─── Order Status ────────────────────────────────────────────────────────────

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
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

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
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

// ─── Partner Status ──────────────────────────────────────────────────────────

export type PartnerOnboardingStatus =
  | 'registered'
  | 'profile_incomplete'
  | 'documents_pending'
  | 'verification_pending'
  | 'training_pending'
  | 'approved'
  | 'suspended'
  | 'rejected'
  | 'terminated';

export const PARTNER_STATUS_LABELS: Record<PartnerOnboardingStatus, string> = {
  registered: 'Registriert',
  profile_incomplete: 'Profil unvollständig',
  documents_pending: 'Dokumente ausstehend',
  verification_pending: 'Verifizierung ausstehend',
  training_pending: 'Schulung ausstehend',
  approved: 'Freigegeben',
  suspended: 'Gesperrt',
  rejected: 'Abgelehnt',
  terminated: 'Gekündigt',
};

export const PARTNER_STATUS_COLORS: Record<PartnerOnboardingStatus, string> = {
  registered: 'bg-blue-100 text-blue-800',
  profile_incomplete: 'bg-amber-100 text-amber-800',
  documents_pending: 'bg-amber-100 text-amber-800',
  verification_pending: 'bg-purple-100 text-purple-800',
  training_pending: 'bg-purple-100 text-purple-800',
  approved: 'bg-emerald-100 text-emerald-800',
  suspended: 'bg-red-100 text-red-800',
  rejected: 'bg-red-100 text-red-800',
  terminated: 'bg-gray-100 text-gray-800',
};

// ─── Risk Level ──────────────────────────────────────────────────────────────

export const RISK_LEVEL_LABELS: Record<RiskLevel, string> = {
  low: 'Niedrig',
  medium: 'Mittel',
  high: 'Hoch',
  critical: 'Kritisch',
};

export const RISK_LEVEL_COLORS: Record<RiskLevel, string> = {
  low: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
};

// ─── Order Status Flow ───────────────────────────────────────────────────────

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  'draft',
  'payment_pending',
  'paid',
  'partner_matching',
  'partner_assigned',
  'appointment_confirmed',
  'inspection_ready',
  'inspection_in_progress',
  'report_pending',
  'qa_review',
  'completed',
  'payout_pending',
  'payout_completed',
];

export function getOrderStatusIndex(status: OrderStatus): number {
  return ORDER_STATUS_FLOW.indexOf(status);
}

export function isTerminalStatus(status: OrderStatus): boolean {
  return ['cancelled', 'refunded', 'disputed', 'complaint_open', 'payout_completed'].includes(status);
}

/**
 * Order and inspection status utilities for Safety4Car.
 */

import { OrderStatus, InspectionStatus, RiskLevel } from '../types';

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
];

export const STATUS_LABELS: Record<OrderStatus, string> = {
  draft: 'Entwurf',
  payment_pending: 'Zahlung ausstehend',
  paid: 'Bezahlt',
  partner_matching: 'Partner wird gesucht',
  partner_assigned: 'Partner zugewiesen',
  appointment_confirmed: 'Termin bestätigt',
  inspection_ready: 'Inspektion bereit',
  inspection_in_progress: 'Inspektion läuft',
  report_pending: 'Report ausstehend',
  qa_review: 'Qualitätsprüfung',
  completed: 'Abgeschlossen',
  payout_pending: 'Auszahlung ausstehend',
  payout_completed: 'Ausgezahlt',
  cancelled: 'Storniert',
  refunded: 'Erstattet',
  disputed: 'Streitfall',
  complaint_open: 'Beschwerde offen',
};

export const INSPECTION_STATUS_LABELS: Record<InspectionStatus, string> = {
  pending: 'Ausstehend',
  in_progress: 'In Bearbeitung',
  submitted: 'Eingereicht',
  approved: 'Genehmigt',
  rejected: 'Abgelehnt',
};

export const RISK_LABELS: Record<RiskLevel, string> = {
  low: 'Gering',
  medium: 'Mittel',
  high: 'Hoch',
  critical: 'Kritisch',
};

export const RISK_COLORS: Record<RiskLevel, string> = {
  low: '#10B981',
  medium: '#F59E0B',
  high: '#EF4444',
  critical: '#7C2D12',
};

export function getOrderProgress(status: OrderStatus): number {
  const index = ORDER_STATUS_FLOW.indexOf(status);
  if (index === -1) return 0;
  return Math.round((index / (ORDER_STATUS_FLOW.length - 1)) * 100);
}

export function isTerminalStatus(status: OrderStatus): boolean {
  return ['completed', 'cancelled', 'refunded'].includes(status);
}

export function canStartInspection(status: OrderStatus): boolean {
  return ['inspection_ready', 'inspection_in_progress'].includes(status);
}

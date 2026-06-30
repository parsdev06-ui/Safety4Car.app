import React from 'react';
import { View, Text, ViewStyle } from 'react-native';

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  draft: { bg: '#F3F4F6', text: '#6B7280', label: 'Entwurf' },
  payment_pending: { bg: '#FEF3C7', text: '#D97706', label: 'Zahlung ausstehend' },
  paid: { bg: '#D1FAE5', text: '#059669', label: 'Bezahlt' },
  partner_matching: { bg: '#FEF3C7', text: '#D97706', label: 'Partner wird gesucht' },
  partner_assigned: { bg: '#DBEAFE', text: '#2563EB', label: 'Partner zugewiesen' },
  appointment_confirmed: { bg: '#DBEAFE', text: '#2563EB', label: 'Termin bestätigt' },
  inspection_ready: { bg: '#DBEAFE', text: '#2563EB', label: 'Inspektion bereit' },
  inspection_in_progress: { bg: '#FEF3C7', text: '#D97706', label: 'Inspektion läuft' },
  report_pending: { bg: '#FEF3C7', text: '#D97706', label: 'Report ausstehend' },
  qa_review: { bg: '#FEF3C7', text: '#D97706', label: 'Qualitätsprüfung' },
  completed: { bg: '#D1FAE5', text: '#059669', label: 'Abgeschlossen' },
  payout_pending: { bg: '#FEF3C7', text: '#D97706', label: 'Auszahlung ausstehend' },
  payout_completed: { bg: '#D1FAE5', text: '#059669', label: 'Ausgezahlt' },
  cancelled: { bg: '#F3F4F6', text: '#6B7280', label: 'Storniert' },
  refunded: { bg: '#F3F4F6', text: '#6B7280', label: 'Erstattet' },
  disputed: { bg: '#FEE2E2', text: '#DC2626', label: 'Streitfall' },
  complaint_open: { bg: '#FEE2E2', text: '#DC2626', label: 'Beschwerde offen' },
  low: { bg: '#D1FAE5', text: '#059669', label: 'Niedrig' },
  medium: { bg: '#FEF3C7', text: '#D97706', label: 'Mittel' },
  high: { bg: '#FEE2E2', text: '#DC2626', label: 'Hoch' },
  critical: { bg: '#FEE2E2', text: '#DC2626', label: 'Kritisch' },
  pending: { bg: '#FEF3C7', text: '#D97706', label: 'Ausstehend' },
  pass: { bg: '#D1FAE5', text: '#059669', label: 'OK' },
  fail: { bg: '#FEE2E2', text: '#DC2626', label: 'Mangel' },
  warning: { bg: '#FEF3C7', text: '#D97706', label: 'Hinweis' },
};

interface Props {
  status: string;
  label?: string;
  style?: ViewStyle;
}

export function StatusBadge({ status, label, style }: Props) {
  const config = statusConfig[status] || { bg: '#F3F4F6', text: '#6B7280', label: status };
  return (
    <View style={[{ backgroundColor: config.bg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 9999 }, style]}>
      <Text style={{ color: config.text, fontSize: 12, fontWeight: '500' }}>
        {label || config.label}
      </Text>
    </View>
  );
}

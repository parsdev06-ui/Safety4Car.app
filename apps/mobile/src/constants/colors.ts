export const colors = {
  primary: {
    navy: '#0F172A',
    blue: '#2563EB',
  },
  trust: {
    emerald: '#10B981',
  },
  caution: {
    amber: '#F59E0B',
  },
  risk: {
    red: '#EF4444',
  },
  neutral: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#111827',
    muted: '#6B7280',
    border: '#E5E7EB',
  },
};

export const riskColors: Record<string, string> = {
  low: colors.trust.emerald,
  medium: colors.caution.amber,
  high: colors.risk.red,
  critical: colors.risk.red,
};

export const statusColors: Record<string, string> = {
  draft: colors.neutral.muted,
  payment_pending: colors.caution.amber,
  paid: colors.trust.emerald,
  partner_matching: colors.caution.amber,
  partner_assigned: colors.primary.blue,
  appointment_confirmed: colors.primary.blue,
  inspection_ready: colors.primary.blue,
  inspection_in_progress: colors.caution.amber,
  report_pending: colors.caution.amber,
  qa_review: colors.caution.amber,
  completed: colors.trust.emerald,
  payout_pending: colors.caution.amber,
  payout_completed: colors.trust.emerald,
  cancelled: colors.neutral.muted,
  refunded: colors.neutral.muted,
  disputed: colors.risk.red,
  complaint_open: colors.risk.red,
};

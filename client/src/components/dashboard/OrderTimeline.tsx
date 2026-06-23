import { OrderStatus } from '@/types';
import { Check, Clock } from 'lucide-react';

const timelineSteps: OrderStatus[] = [
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

const stepLabels: Record<OrderStatus, string> = {
  draft: 'Entwurf',
  payment_pending: 'Zahlung',
  paid: 'Bezahlt',
  partner_matching: 'Partner gesucht',
  partner_assigned: 'Partner zugewiesen',
  appointment_confirmed: 'Termin bestätigt',
  inspection_ready: 'Bereit',
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

interface OrderTimelineProps {
  currentStatus: OrderStatus;
  compact?: boolean;
}

export function OrderTimeline({ currentStatus, compact = false }: OrderTimelineProps) {
  const currentStepIndex = timelineSteps.indexOf(currentStatus);

  if (compact) {
    return (
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Status</p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-foreground">{stepLabels[currentStatus]}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Bearbeitungsfortschritt</h3>
      <div className="space-y-3">
        {timelineSteps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div key={step} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : isCurrent
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : isCurrent ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < timelineSteps.length - 1 && (
                  <div
                    className={`w-0.5 h-8 mt-1 ${
                      isCompleted ? 'bg-emerald-200' : 'bg-border'
                    }`}
                  />
                )}
              </div>
              <div className="pt-1">
                <p
                  className={`text-sm font-medium ${
                    isCurrent
                      ? 'text-primary'
                      : isCompleted
                      ? 'text-emerald-700'
                      : 'text-muted-foreground'
                  }`}
                >
                  {stepLabels[step]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

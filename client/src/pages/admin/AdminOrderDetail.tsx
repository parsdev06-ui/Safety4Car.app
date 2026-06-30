import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import { RiskBadge, StatusBadge } from '@/components/StatusBadge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  getCustomerById,
  getInspectionByOrderId,
  getInspectorById,
  getOrderById,
  getPackageById,
  getPartnerById,
  getPaymentByOrderId,
  getReportByOrderId,
  getVehicleById,
} from '@/lib/mock-data';
import type { OrderStatus, Payment } from '@/types';
import {
  AlertCircle,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  DollarSign,
  FileText,
  History,
  MapPin,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Link, useParams } from 'wouter';

const currencyFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const dateTimeFormatter = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const paymentStatusConfig: Record<Payment['status'], { label: string; className: string }> = {
  pending: { label: 'Ausstehend', className: 'bg-amber-100 text-amber-800' },
  completed: { label: 'Abgeschlossen', className: 'bg-emerald-100 text-emerald-800' },
  failed: { label: 'Fehlgeschlagen', className: 'bg-red-100 text-red-800' },
  refunded: { label: 'Erstattet', className: 'bg-slate-100 text-slate-800' },
};

const riskLabelMap = {
  low: 'Niedrig',
  medium: 'Mittel',
  high: 'Hoch',
  critical: 'Kritisch',
} as const;

const orderStageLabelMap: Partial<Record<OrderStatus, string>> = {
  payment_pending: 'Zahlung ausstehend',
  paid: 'Zahlung bestätigt',
  partner_assigned: 'Partner zugewiesen',
  appointment_confirmed: 'Termin bestätigt',
  inspection_in_progress: 'Inspektion gestartet',
  report_pending: 'Report wird erstellt',
  completed: 'Auftrag abgeschlossen',
};

const getSidebarItems = () => [
  { label: 'Dashboard', href: '/admin/dashboard', icon: <BarChart3 className="w-4 h-4" /> },
  { label: 'Aufträge', href: '/admin/orders', active: true, icon: <ClipboardList className="w-4 h-4" /> },
  { label: 'Partner', href: '/admin/partners', icon: <Users className="w-4 h-4" /> },
  { label: 'Reports', href: '/admin/reports', icon: <FileText className="w-4 h-4" /> },
  { label: 'Zahlungen', href: '/admin/payments', icon: <DollarSign className="w-4 h-4" /> },
  { label: 'Beschwerden', href: '/admin/complaints', icon: <AlertCircle className="w-4 h-4" /> },
  { label: 'Audit Logs', href: '/admin/audit-logs', icon: <History className="w-4 h-4" /> },
];

const formatDate = (value?: string) => (value ? dateFormatter.format(new Date(value)) : '—');
const formatDateTime = (value?: string) => (value ? dateTimeFormatter.format(new Date(value)) : '—');

export default function AdminOrderDetail() {
  const params = useParams<{ id: string }>();
  const order = params.id ? getOrderById(params.id) : undefined;

  if (!order) {
    return (
      <DashboardLayout role="admin" sidebarItems={getSidebarItems()}>
        <Card>
          <CardHeader>
            <CardTitle>Auftrag nicht gefunden</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Für die angeforderte Auftrags-ID konnten keine Daten geladen werden.
            </p>
            <Link href="/admin/orders">
              <a>
                <Button variant="outline">Zur Auftragsliste</Button>
              </a>
            </Link>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  const customer = getCustomerById(order.customerId);
  const vehicle = getVehicleById(order.vehicleId);
  const packageData = getPackageById(order.packageId);
  const partner = order.partnerId ? getPartnerById(order.partnerId) : undefined;
  const inspector = order.inspectorId ? getInspectorById(order.inspectorId) : undefined;
  const inspection = getInspectionByOrderId(order.id);
  const report = getReportByOrderId(order.id);
  const payment = getPaymentByOrderId(order.id);
  const paymentStatus = payment ? paymentStatusConfig[payment.status] : null;

  const timeline = [
    {
      label: 'Auftrag erstellt',
      timestamp: order.createdAt,
      description: `Auftrag ${order.id} wurde angelegt.`,
    },
    payment
      ? {
          label: orderStageLabelMap.paid ?? 'Zahlung bestätigt',
          timestamp: payment.completedAt ?? payment.createdAt,
          description: `${currencyFormatter.format(payment.amount)} per ${payment.method.replace('_', ' ')} bezahlt.`,
        }
      : null,
    partner
      ? {
          label: orderStageLabelMap.partner_assigned ?? 'Partner zugewiesen',
          timestamp: order.updatedAt,
          description: `${partner.name} wurde dem Auftrag zugeordnet.`,
        }
      : null,
    order.appointmentDate
      ? {
          label: orderStageLabelMap.appointment_confirmed ?? 'Termin bestätigt',
          timestamp: `${order.appointmentDate}T${order.appointmentTime ?? '00:00'}:00`,
          description: order.appointmentLocation ?? 'Terminort wird noch abgestimmt.',
        }
      : null,
    inspection?.startedAt
      ? {
          label: orderStageLabelMap.inspection_in_progress ?? 'Inspektion gestartet',
          timestamp: inspection.startedAt,
          description: inspector
            ? `Inspektion durch ${inspector.firstName} ${inspector.lastName}`
            : 'Inspektion wurde gestartet.',
        }
      : null,
    inspection?.completedAt
      ? {
          label: 'Inspektion abgeschlossen',
          timestamp: inspection.completedAt,
          description: inspection.notes,
        }
      : null,
    report
      ? {
          label: 'Report erstellt',
          timestamp: report.generatedAt,
          description: report.summary,
        }
      : null,
    order.completedAt
      ? {
          label: orderStageLabelMap.completed ?? 'Auftrag abgeschlossen',
          timestamp: order.completedAt,
          description: 'Alle Prozessschritte wurden finalisiert.',
        }
      : null,
  ]
    .filter((entry): entry is { label: string; timestamp: string; description: string } => Boolean(entry?.timestamp))
    .sort((left, right) => new Date(left.timestamp).getTime() - new Date(right.timestamp).getTime());

  const completedChecklistItems = inspection?.checklist.filter((item) => item.status !== 'pending').length ?? 0;

  return (
    <DashboardLayout role="admin" sidebarItems={getSidebarItems()}>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">Auftrag #{order.id}</h1>
              <StatusBadge status={order.status} type="order" />
            </div>
            <p className="text-muted-foreground">
              Detaillierte Ansicht zu Kunde, Fahrzeug, Termin, Zahlung und Prüfablauf.
            </p>
          </div>
          <Link href="/admin/orders">
            <a>
              <Button variant="outline">Zurück zur Auftragsliste</Button>
            </a>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DashboardMetricCard
            title="Auftragswert"
            value={currencyFormatter.format(order.totalPrice)}
            icon={<DollarSign className="w-5 h-5" />}
            description={packageData?.name ?? 'Kein Paket'}
          />
          <DashboardMetricCard
            title="Zahlung"
            value={paymentStatus?.label ?? 'Offen'}
            icon={<CheckCircle2 className="w-5 h-5" />}
            description={payment ? `Transaktion ${payment.transactionId}` : 'Noch keine Zahlung erfasst'}
          />
          <DashboardMetricCard
            title="Checkliste"
            value={inspection ? `${completedChecklistItems}/${inspection.checklist.length}` : '—'}
            icon={<ShieldCheck className="w-5 h-5" />}
            description={inspection ? 'Erledigte Prüfpunkte' : 'Noch keine Inspektion'}
          />
          <DashboardMetricCard
            title="Risiko"
            value={report ? riskLabelMap[report.riskLevel] : inspection ? riskLabelMap[inspection.riskAssessment] : '—'}
            icon={<AlertCircle className="w-5 h-5" />}
            description={report ? 'Aus dem finalen Report' : inspection ? 'Vorläufige Einschätzung' : 'Noch keine Bewertung'}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Kundendaten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium text-foreground">
                      {customer?.firstName} {customer?.lastName}
                    </div>
                    <div className="text-muted-foreground">{customer?.email}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Telefon</div>
                    <div className="font-medium text-foreground">{customer?.phone}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Adresse</div>
                    <div className="font-medium text-foreground">
                      {customer?.address}, {customer?.postalCode} {customer?.city}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fahrzeugdaten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium text-foreground">
                      {vehicle?.make} {vehicle?.model}
                    </div>
                    <div className="text-muted-foreground">Kennzeichen {vehicle?.licensePlate}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-muted-foreground">Baujahr</div>
                      <div className="font-medium text-foreground">{vehicle?.year}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Kilometerstand</div>
                      <div className="font-medium text-foreground">{vehicle?.mileage.toLocaleString('de-DE')} km</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">VIN</div>
                      <div className="font-medium text-foreground">{vehicle?.vin}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Antrieb</div>
                      <div className="font-medium text-foreground">
                        {vehicle?.fuelType} • {vehicle?.transmission}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Status-Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((entry, index) => (
                    <div key={`${entry.label}-${entry.timestamp}`} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="mt-1 h-3 w-3 rounded-full bg-primary" />
                        {index < timeline.length - 1 && <div className="mt-2 h-full w-px bg-border" />}
                      </div>
                      <div className="pb-5">
                        <div className="font-medium text-foreground">{entry.label}</div>
                        <div className="text-xs text-muted-foreground mb-1">{formatDateTime(entry.timestamp)}</div>
                        <p className="text-sm text-muted-foreground">{entry.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {inspection && (
              <Card>
                <CardHeader>
                  <CardTitle>Prüf-Checkliste</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Kategorie</TableHead>
                        <TableHead>Prüfpunkt</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Notiz</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inspection.checklist.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.category}</TableCell>
                          <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                          <TableCell>
                            <Badge className="bg-muted text-foreground capitalize">{item.status}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{item.notes ?? '—'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paket & Termin</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <div className="font-medium text-foreground">{packageData?.name}</div>
                  <div className="text-muted-foreground">{packageData?.description}</div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <CalendarClock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-foreground">
                      {formatDate(order.appointmentDate)} um {order.appointmentTime ?? 'offen'}
                    </div>
                    <div className="text-muted-foreground">Dauer ca. {packageData?.estimatedDuration ?? '—'} Std.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div className="font-medium text-foreground">{order.appointmentLocation ?? 'Standort noch nicht festgelegt'}</div>
                </div>
                {order.notes && (
                  <div>
                    <div className="text-muted-foreground mb-1">Interne Notiz</div>
                    <p className="text-foreground">{order.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Zahlungsstatus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {payment && paymentStatus ? (
                  <>
                    <Badge className={`${paymentStatus.className} font-medium`}>{paymentStatus.label}</Badge>
                    <div>
                      <div className="text-muted-foreground">Betrag</div>
                      <div className="font-medium text-foreground">{currencyFormatter.format(payment.amount)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Methode</div>
                      <div className="font-medium text-foreground capitalize">{payment.method.replace('_', ' ')}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Gebucht am</div>
                      <div className="font-medium text-foreground">{formatDateTime(payment.createdAt)}</div>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground">Für diesen Auftrag wurde noch keine Zahlung erfasst.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Partner & Inspektor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Partner</div>
                  {partner ? (
                    <div className="font-medium text-foreground">
                      <Link href={`/admin/partners/${partner.id}`}>
                        <a className="hover:underline">{partner.name}</a>
                      </Link>
                    </div>
                  ) : (
                    <div className="font-medium text-foreground">Noch nicht zugewiesen</div>
                  )}
                </div>
                <div>
                  <div className="text-muted-foreground">Inspektor</div>
                  {inspector ? (
                    <>
                      <div className="font-medium text-foreground">
                        {inspector.firstName} {inspector.lastName}
                      </div>
                      <div className="text-muted-foreground">{inspector.email}</div>
                      <div className="text-muted-foreground">Zertifikate: {inspector.certifications.join(', ')}</div>
                    </>
                  ) : (
                    <div className="font-medium text-foreground">Noch nicht zugewiesen</div>
                  )}
                </div>
                {inspection && (
                  <div>
                    <div className="text-muted-foreground mb-1">Inspektionsstatus</div>
                    <StatusBadge status={inspection.status} type="inspection" />
                  </div>
                )}
              </CardContent>
            </Card>

            {report && (
              <Card>
                <CardHeader>
                  <CardTitle>Report-Zusammenfassung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <RiskBadge level={report.riskLevel} />
                    <span className="text-muted-foreground">Erstellt am {formatDateTime(report.generatedAt)}</span>
                  </div>
                  <p className="text-foreground">{report.summary}</p>
                  <div>
                    <div className="text-muted-foreground mb-2">Empfehlungen</div>
                    <ul className="space-y-2 text-foreground">
                      {report.recommendations.map((recommendation) => (
                        <li key={recommendation} className="flex gap-2">
                          <span>•</span>
                          <span>{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

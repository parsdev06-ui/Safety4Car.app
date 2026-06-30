import { RiskBadge, StatusBadge } from '@/components/StatusBadge';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  getCustomerById,
  getInspectionByOrderId,
  getOrdersByCustomerId,
  getPackageById,
  getReportByOrderId,
  getVehicleById,
  tickets,
} from '@/lib/mock-data';
import { Order, Ticket as TicketType, TicketPriority } from '@/types';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  ClipboardList,
  LayoutDashboard,
  Mail,
  Phone,
  Ticket,
  Users,
} from 'lucide-react';
import { Link, useParams } from 'wouter';

const sidebarItems = [
  { label: 'Dashboard', href: '/cs/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Tickets', href: '/cs/tickets', active: true, icon: <Ticket className="w-4 h-4" /> },
  { label: 'Kunden', href: '/cs/customers', icon: <Users className="w-4 h-4" /> },
  { label: 'Aufträge', href: '/cs/orders', icon: <ClipboardList className="w-4 h-4" /> },
  { label: 'Beschwerden', href: '/cs/complaints', icon: <AlertCircle className="w-4 h-4" /> },
];

const assigneeLabels: Record<string, string> = {
  'cs-1': 'Mia Schneider',
  'cs-2': 'Jonas Becker',
};

const priorityConfig: Record<TicketPriority, { label: string; className: string }> = {
  low: { label: 'Niedrig', className: 'bg-slate-100 text-slate-800' },
  medium: { label: 'Mittel', className: 'bg-amber-100 text-amber-800' },
  high: { label: 'Hoch', className: 'bg-orange-100 text-orange-800' },
  urgent: { label: 'Dringend', className: 'bg-red-100 text-red-800' },
};

function formatDate(value?: string, withTime = false) {
  if (!value) {
    return '—';
  }

  return new Date(value).toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  });
}

function PriorityBadge({ priority }: { priority: TicketPriority }) {
  const config = priorityConfig[priority];
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}>{config.label}</span>;
}

export default function CSTicketDetail() {
  const params = useParams<{ id: string }>();
  const ticket = tickets.find((entry: TicketType) => entry.id === params.id);

  if (!ticket) {
    return (
      <DashboardLayout role="cs" sidebarItems={sidebarItems}>
        <Card>
          <CardHeader>
            <CardTitle>Ticket nicht gefunden</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Das angeforderte Ticket konnte in den Mock-Daten nicht gefunden werden.
            </p>
            <Link href="/cs/tickets">
              <a className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zur Ticketliste
              </a>
            </Link>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  const customer = getCustomerById(ticket.customerId);
  const relatedOrders = getOrdersByCustomerId(ticket.customerId);
  const assignedTo = ticket.assignedTo
    ? assigneeLabels[ticket.assignedTo] ?? ticket.assignedTo
    : 'Nicht zugewiesen';

  return (
    <DashboardLayout role="cs" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link href="/cs/tickets">
              <a className="mb-2 inline-flex items-center text-sm font-medium text-primary hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zurück zu allen Tickets
              </a>
            </Link>
            <h1 className="text-3xl font-bold text-foreground">{ticket.subject}</h1>
            <p className="mt-2 text-muted-foreground">{ticket.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline">Kunden kontaktieren</Button>
            <Button type="button" variant="outline">Status ändern</Button>
            <Button type="button">Priorität ändern</Button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Kundendaten</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-lg font-semibold text-foreground">
                  {customer ? `${customer.firstName} ${customer.lastName}` : 'Unbekannter Kunde'}
                </p>
                <p className="text-sm text-muted-foreground">Kunden-ID: {ticket.customerId}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{customer?.email ?? '—'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{customer?.phone ?? '—'}</span>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-foreground">Status</p>
                  <div className="mt-2">
                    <StatusBadge status={ticket.status} type="ticket" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Priorität</p>
                  <div className="mt-2">
                    <PriorityBadge priority={ticket.priority} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Zugewiesen an</p>
                  <p className="mt-2 text-sm text-muted-foreground">{assignedTo}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Letzte Aktualisierung</p>
                  <p className="mt-2 text-sm text-muted-foreground">{formatDate(ticket.updatedAt, true)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Zeitstempel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground">Erstellt am</p>
                <p className="mt-1 text-sm text-muted-foreground">{formatDate(ticket.createdAt, true)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Aktualisiert am</p>
                <p className="mt-1 text-sm text-muted-foreground">{formatDate(ticket.updatedAt, true)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Gelöst am</p>
                <p className="mt-1 text-sm text-muted-foreground">{formatDate(ticket.resolvedAt, true)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Zugehörige Aufträge</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 lg:grid-cols-2">
              {relatedOrders.map((order: Order) => {
                const vehicle = getVehicleById(order.vehicleId);
                const packageInfo = getPackageById(order.packageId);
                const report = getReportByOrderId(order.id);
                const inspection = getInspectionByOrderId(order.id);
                const riskLevel = report?.riskLevel ?? inspection?.riskAssessment;

                return (
                  <div key={order.id} className="rounded-lg border border-border p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-foreground">Auftrag {order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {vehicle ? `${vehicle.make} ${vehicle.model} · ${vehicle.licensePlate}` : 'Fahrzeug unbekannt'}
                        </p>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>

                    <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                      <div>
                        <p className="font-medium text-foreground">Paket</p>
                        <p className="text-muted-foreground">{packageInfo?.name ?? '—'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Termin</p>
                        <p className="text-muted-foreground">
                          {order.appointmentDate
                            ? `${formatDate(order.appointmentDate)} · ${order.appointmentTime ?? 'Uhrzeit offen'}`
                            : 'Noch nicht geplant'}
                        </p>
                      </div>
                    </div>

                    {riskLevel && (
                      <div className="mt-4">
                        <p className="mb-2 text-sm font-medium text-foreground">Risiko</p>
                        <RiskBadge level={riskLevel} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interne Notizen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Notiz für die interne Bearbeitung hinzufügen ..."
              defaultValue={`Ticket ${ticket.id}: Kunde zur weiteren Rückmeldung einplanen.`}
              rows={6}
            />
            <p className="text-sm text-muted-foreground">
              Diese Eingabe dient nur der Demo und wird nicht gespeichert.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

import { RiskBadge, StatusBadge } from '@/components/StatusBadge';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
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
  getPackageById,
  getPartnerById,
  getReportByOrderId,
  getVehicleById,
  orders,
} from '@/lib/mock-data';
import { Order } from '@/types';
import { AlertCircle, ClipboardList, LayoutDashboard, Ticket, Users } from 'lucide-react';

const sidebarItems = [
  { label: 'Dashboard', href: '/cs/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Tickets', href: '/cs/tickets', icon: <Ticket className="w-4 h-4" /> },
  { label: 'Kunden', href: '/cs/customers', icon: <Users className="w-4 h-4" /> },
  { label: 'Aufträge', href: '/cs/orders', active: true, icon: <ClipboardList className="w-4 h-4" /> },
  { label: 'Beschwerden', href: '/cs/complaints', icon: <AlertCircle className="w-4 h-4" /> },
];

function formatDate(value?: string) {
  if (!value) {
    return 'Noch offen';
  }

  return new Date(value).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
  }).format(amount);
}

export default function CSOrders() {
  const sortedOrders = [...orders].sort(
    (a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <DashboardLayout role="cs" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Auftragsübersicht</h1>
          <p className="text-muted-foreground">
            Alle Aufträge mit Kunde, Fahrzeug, Paket, Risiko und Terminstatus für eine schnelle Einordnung.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alle Aufträge ({sortedOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Auftrag</TableHead>
                  <TableHead>Kunde</TableHead>
                  <TableHead>Fahrzeug</TableHead>
                  <TableHead>Paket & Risiko</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Termin</TableHead>
                  <TableHead>Preis</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order: Order) => {
                  const customer = getCustomerById(order.customerId);
                  const vehicle = getVehicleById(order.vehicleId);
                  const packageInfo = getPackageById(order.packageId);
                  const partner = order.partnerId ? getPartnerById(order.partnerId) : undefined;
                  const inspector = order.inspectorId ? getInspectorById(order.inspectorId) : undefined;
                  const report = getReportByOrderId(order.id);
                  const inspection = getInspectionByOrderId(order.id);
                  const riskLevel = report?.riskLevel ?? inspection?.riskAssessment;

                  return (
                    <TableRow key={order.id}>
                      <TableCell className="whitespace-normal">
                        <div className="font-medium">{order.id}</div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {partner?.name ?? 'Partner offen'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {inspector ? `${inspector.firstName} ${inspector.lastName}` : 'Inspektor offen'}
                        </p>
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        <div className="font-medium">
                          {customer ? `${customer.firstName} ${customer.lastName}` : 'Unbekannter Kunde'}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{customer?.email ?? '—'}</p>
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        <div className="font-medium">
                          {vehicle ? `${vehicle.make} ${vehicle.model}` : 'Unbekanntes Fahrzeug'}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {vehicle ? `${vehicle.licensePlate} · ${vehicle.year}` : '—'}
                        </p>
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        <div className="font-medium">{packageInfo?.name ?? '—'}</div>
                        <p className="mt-1 text-sm text-muted-foreground">{packageInfo?.description ?? 'Kein Paket hinterlegt'}</p>
                        <div className="mt-2">
                          {riskLevel ? <RiskBadge level={riskLevel} /> : <span className="text-sm text-muted-foreground">Kein Risiko erfasst</span>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        <div className="font-medium">
                          {order.appointmentDate
                            ? `${formatDate(order.appointmentDate)} · ${order.appointmentTime ?? 'Uhrzeit offen'}`
                            : 'Noch nicht geplant'}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{order.appointmentLocation ?? 'Ort wird noch festgelegt'}</p>
                      </TableCell>
                      <TableCell>{formatCurrency(order.totalPrice, order.currency)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

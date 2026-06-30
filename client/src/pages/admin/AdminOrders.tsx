import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import { StatusBadge } from '@/components/StatusBadge';
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
  orders,
  getCustomerById,
  getPackageById,
  getVehicleById,
} from '@/lib/mock-data';
import type { Order } from '@/types';
import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  DollarSign,
  AlertCircle,
  FileText,
  History,
  Users,
} from 'lucide-react';
import { Link } from 'wouter';

const currencyFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const getSidebarItems = () => [
  { label: 'Dashboard', href: '/admin/dashboard', icon: <BarChart3 className="w-4 h-4" /> },
  { label: 'Aufträge', href: '/admin/orders', active: true, icon: <ClipboardList className="w-4 h-4" /> },
  { label: 'Partner', href: '/admin/partners', icon: <Users className="w-4 h-4" /> },
  { label: 'Reports', href: '/admin/reports', icon: <FileText className="w-4 h-4" /> },
  { label: 'Zahlungen', href: '/admin/payments', icon: <DollarSign className="w-4 h-4" /> },
  { label: 'Beschwerden', href: '/admin/complaints', icon: <AlertCircle className="w-4 h-4" /> },
  { label: 'Audit Logs', href: '/admin/audit-logs', icon: <History className="w-4 h-4" /> },
];

const formatDate = (date?: string) => (date ? dateFormatter.format(new Date(date)) : '—');

export default function AdminOrders() {
  const sortedOrders = [...orders].sort(
    (left: Order, right: Order) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );

  const totalVolume = sortedOrders.reduce((sum, order) => sum + order.totalPrice, 0);
  const activeOrders = sortedOrders.filter(
    (order) => !['completed', 'cancelled', 'refunded'].includes(order.status),
  ).length;
  const upcomingAppointments = sortedOrders.filter((order) => order.appointmentDate).length;

  return (
    <DashboardLayout role="admin" sidebarItems={getSidebarItems()}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Auftragsübersicht</h1>
          <p className="text-muted-foreground">
            Alle Kundenaufträge mit Fahrzeug-, Paket- und Statusinformationen auf einen Blick.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DashboardMetricCard
            title="Gesamtaufträge"
            value={sortedOrders.length}
            icon={<ClipboardList className="w-5 h-5" />}
            description="Aktuell im System erfasst"
          />
          <DashboardMetricCard
            title="Aktiv"
            value={activeOrders}
            icon={<CalendarDays className="w-5 h-5" />}
            description="Noch nicht abgeschlossen"
          />
          <DashboardMetricCard
            title="Abgeschlossen"
            value={sortedOrders.filter((order) => order.status === 'completed').length}
            icon={<BarChart3 className="w-5 h-5" />}
            description="Erfolgreich bearbeitet"
          />
          <DashboardMetricCard
            title="Auftragsvolumen"
            value={currencyFormatter.format(totalVolume)}
            icon={<DollarSign className="w-5 h-5" />}
            description={`${upcomingAppointments} Termine geplant`}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alle Aufträge</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Auftrag</TableHead>
                  <TableHead>Kunde</TableHead>
                  <TableHead>Fahrzeug</TableHead>
                  <TableHead>Paket</TableHead>
                  <TableHead>Termin</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aktion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order) => {
                  const customer = getCustomerById(order.customerId);
                  const vehicle = getVehicleById(order.vehicleId);
                  const packageData = getPackageById(order.packageId);

                  return (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">#{order.id}</div>
                          <div className="text-xs text-muted-foreground">
                            Erstellt am {formatDate(order.createdAt)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">
                            {customer?.firstName} {customer?.lastName}
                          </div>
                          <div className="text-xs text-muted-foreground">{customer?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">
                            {vehicle?.make} {vehicle?.model}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {vehicle?.licensePlate} • {vehicle?.year}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{packageData?.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {currencyFormatter.format(order.totalPrice)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{formatDate(order.appointmentDate)}</div>
                          <div className="text-xs text-muted-foreground">{order.appointmentTime ?? 'Noch offen'}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} type="order" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/orders/${order.id}`}>
                          <a>
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </a>
                        </Link>
                      </TableCell>
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

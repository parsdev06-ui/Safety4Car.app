import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Badge } from '@/components/ui/badge';
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
  complaints,
  getCustomerById,
  getVehicleById,
  getOrderById,
} from '@/lib/mock-data';
import type { TicketPriority } from '@/types';
import {
  AlertCircle,
  BarChart3,
  ClipboardList,
  DollarSign,
  FileText,
  History,
  ShieldAlert,
  Users,
} from 'lucide-react';
import { Link } from 'wouter';

const priorityConfig: Record<TicketPriority, { label: string; className: string }> = {
  low: { label: 'Niedrig', className: 'bg-slate-100 text-slate-800' },
  medium: { label: 'Mittel', className: 'bg-blue-100 text-blue-800' },
  high: { label: 'Hoch', className: 'bg-orange-100 text-orange-800' },
  urgent: { label: 'Dringend', className: 'bg-red-100 text-red-800' },
};

const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const getSidebarItems = () => [
  { label: 'Dashboard', href: '/admin/dashboard', icon: <BarChart3 className="w-4 h-4" /> },
  { label: 'Aufträge', href: '/admin/orders', icon: <ClipboardList className="w-4 h-4" /> },
  { label: 'Partner', href: '/admin/partners', icon: <Users className="w-4 h-4" /> },
  { label: 'Reports', href: '/admin/reports', icon: <FileText className="w-4 h-4" /> },
  { label: 'Zahlungen', href: '/admin/payments', icon: <DollarSign className="w-4 h-4" /> },
  { label: 'Beschwerden', href: '/admin/complaints', active: true, icon: <AlertCircle className="w-4 h-4" /> },
  { label: 'Audit Logs', href: '/admin/audit-logs', icon: <History className="w-4 h-4" /> },
];

export default function AdminComplaints() {
  const openComplaints = complaints.filter((complaint) => ['open', 'in_progress'].includes(complaint.status)).length;
  const highPriorityComplaints = complaints.filter((complaint) => ['high', 'urgent'].includes(complaint.priority)).length;

  return (
    <DashboardLayout role="admin" sidebarItems={getSidebarItems()}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Beschwerdemanagement</h1>
          <p className="text-muted-foreground">
            Übersicht über eingehende Beschwerden, Prioritäten und Bearbeitungsstände.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DashboardMetricCard
            title="Beschwerden gesamt"
            value={complaints.length}
            icon={<AlertCircle className="w-5 h-5" />}
            description="Registrierte Fälle"
          />
          <DashboardMetricCard
            title="Offen / in Bearbeitung"
            value={openComplaints}
            icon={<ShieldAlert className="w-5 h-5" />}
            description="Benötigt Aufmerksamkeit"
          />
          <DashboardMetricCard
            title="Gelöst"
            value={complaints.filter((complaint) => complaint.status === 'resolved').length}
            icon={<BarChart3 className="w-5 h-5" />}
            description="Bereits abgeschlossen"
          />
          <DashboardMetricCard
            title="Hohe Priorität"
            value={highPriorityComplaints}
            icon={<ClipboardList className="w-5 h-5" />}
            description="Eskaliert oder dringlich"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alle Beschwerden</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Betreff</TableHead>
                  <TableHead>Kunde</TableHead>
                  <TableHead>Auftrag</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priorität</TableHead>
                  <TableHead>Erstellt</TableHead>
                  <TableHead>Abgeschlossen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.map((complaint) => {
                  const customer = getCustomerById(complaint.customerId);
                  const order = getOrderById(complaint.orderId);
                  const vehicle = order ? getVehicleById(order.vehicleId) : undefined;
                  const priority = priorityConfig[complaint.priority];

                  return (
                    <TableRow key={complaint.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{complaint.subject}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{complaint.description}</div>
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
                          <Link href={`/admin/orders/${complaint.orderId}`}>
                            <a className="font-medium text-foreground hover:underline">#{complaint.orderId}</a>
                          </Link>
                          <div className="text-xs text-muted-foreground">
                            {vehicle?.make} {vehicle?.model}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={complaint.status} type="ticket" />
                      </TableCell>
                      <TableCell>
                        <Badge className={`${priority.className} font-medium`}>{priority.label}</Badge>
                      </TableCell>
                      <TableCell>{dateFormatter.format(new Date(complaint.createdAt))}</TableCell>
                      <TableCell>{complaint.resolvedAt ? dateFormatter.format(new Date(complaint.resolvedAt)) : '—'}</TableCell>
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

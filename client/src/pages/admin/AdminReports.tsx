import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import { RiskBadge } from '@/components/StatusBadge';
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
  getCustomerById,
  getOrderById,
  getVehicleById,
  reports,
} from '@/lib/mock-data';
import type { Report } from '@/types';
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

const reportStatusConfig: Record<Report['status'], { label: string; className: string }> = {
  draft: { label: 'Entwurf', className: 'bg-slate-100 text-slate-800' },
  pending_review: { label: 'In Prüfung', className: 'bg-amber-100 text-amber-800' },
  approved: { label: 'Freigegeben', className: 'bg-emerald-100 text-emerald-800' },
  rejected: { label: 'Abgelehnt', className: 'bg-red-100 text-red-800' },
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
  { label: 'Reports', href: '/admin/reports', active: true, icon: <FileText className="w-4 h-4" /> },
  { label: 'Zahlungen', href: '/admin/payments', icon: <DollarSign className="w-4 h-4" /> },
  { label: 'Beschwerden', href: '/admin/complaints', icon: <AlertCircle className="w-4 h-4" /> },
  { label: 'Audit Logs', href: '/admin/audit-logs', icon: <History className="w-4 h-4" /> },
];

const formatDate = (value: string) => dateFormatter.format(new Date(value));

export default function AdminReports() {
  const approvedReports = reports.filter((report) => report.status === 'approved').length;
  const mediumOrHigher = reports.filter((report) => ['medium', 'high', 'critical'].includes(report.riskLevel)).length;
  const totalFindings = reports.reduce((sum, report) => sum + report.findings.length, 0);

  return (
    <DashboardLayout role="admin" sidebarItems={getSidebarItems()}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Report-Center</h1>
          <p className="text-muted-foreground">
            Freigaben, Risikobewertungen und Kernaussagen aus allen Fahrzeugreports.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DashboardMetricCard
            title="Reports gesamt"
            value={reports.length}
            icon={<FileText className="w-5 h-5" />}
            description="Im Reporting erfasst"
          />
          <DashboardMetricCard
            title="Freigegeben"
            value={approvedReports}
            icon={<BarChart3 className="w-5 h-5" />}
            description="Für Kunden sichtbar"
          />
          <DashboardMetricCard
            title="Risiko ≥ Mittel"
            value={mediumOrHigher}
            icon={<ShieldAlert className="w-5 h-5" />}
            description="Mit erhöhter Aufmerksamkeit"
          />
          <DashboardMetricCard
            title="Findings"
            value={totalFindings}
            icon={<ClipboardList className="w-5 h-5" />}
            description="Erkannte Auffälligkeiten"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alle Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report</TableHead>
                  <TableHead>Auftrag</TableHead>
                  <TableHead>Fahrzeug</TableHead>
                  <TableHead>Risiko</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Erstellt am</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => {
                  const order = getOrderById(report.orderId);
                  const customer = getCustomerById(report.customerId);
                  const vehicle = getVehicleById(report.vehicleId);
                  const status = reportStatusConfig[report.status];

                  return (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">#{report.id}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{report.summary}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Link href={`/admin/orders/${order?.id ?? report.orderId}`}>
                            <a className="font-medium text-foreground hover:underline">#{report.orderId}</a>
                          </Link>
                          <div className="text-xs text-muted-foreground">
                            {customer?.firstName} {customer?.lastName}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">
                            {vehicle?.make} {vehicle?.model}
                          </div>
                          <div className="text-xs text-muted-foreground">{vehicle?.licensePlate}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <RiskBadge level={report.riskLevel} />
                      </TableCell>
                      <TableCell>
                        <Badge className={`${status.className} font-medium`}>{status.label}</Badge>
                      </TableCell>
                      <TableCell>{formatDate(report.generatedAt)}</TableCell>
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

import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
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
  auditLogs,
  getCustomerById,
  getInspectorById,
  getPartnerById,
} from '@/lib/mock-data';
import type { AuditLog } from '@/types';
import {
  AlertCircle,
  BarChart3,
  ClipboardList,
  DollarSign,
  FileText,
  History,
  Shield,
  Users,
} from 'lucide-react';
import { Link } from 'wouter';

const roleConfig: Record<AuditLog['userRole'], { label: string; className: string }> = {
  admin: { label: 'Admin', className: 'bg-purple-100 text-purple-800' },
  customer_success: { label: 'Customer Success', className: 'bg-blue-100 text-blue-800' },
  inspector: { label: 'Inspektor', className: 'bg-emerald-100 text-emerald-800' },
  partner: { label: 'Partner', className: 'bg-amber-100 text-amber-800' },
  customer: { label: 'Kunde', className: 'bg-slate-100 text-slate-800' },
};

const actionLabels: Record<string, string> = {
  completed_inspection: 'Inspektion abgeschlossen',
  approved_report: 'Report freigegeben',
  created_order: 'Auftrag erstellt',
};

const resourceLabels: Record<string, string> = {
  inspection: 'Inspektion',
  report: 'Report',
  order: 'Auftrag',
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
  { label: 'Beschwerden', href: '/admin/complaints', icon: <AlertCircle className="w-4 h-4" /> },
  { label: 'Audit Logs', href: '/admin/audit-logs', active: true, icon: <History className="w-4 h-4" /> },
];

const getUserLabel = (log: AuditLog) => {
  if (log.userRole === 'inspector') {
    const inspector = getInspectorById(log.userId);
    return inspector ? `${inspector.firstName} ${inspector.lastName}` : log.userId;
  }

  if (log.userRole === 'customer') {
    const customer = getCustomerById(log.userId);
    return customer ? `${customer.firstName} ${customer.lastName}` : log.userId;
  }

  if (log.userRole === 'partner') {
    return getPartnerById(log.userId)?.name ?? log.userId;
  }

  return log.userId === 'admin-1' ? 'Admin Team' : log.userId;
};

export default function AdminAuditLogs() {
  const sortedLogs = [...auditLogs].sort(
    (left, right) => new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime(),
  );

  return (
    <DashboardLayout role="admin" sidebarItems={getSidebarItems()}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Audit-Logs</h1>
          <p className="text-muted-foreground">
            Nachvollziehbare Historie aller relevanten Aktionen auf Aufträge, Reports und Inspektionen.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DashboardMetricCard
            title="Einträge gesamt"
            value={sortedLogs.length}
            icon={<History className="w-5 h-5" />}
            description="Im Audit-Trail gespeichert"
          />
          <DashboardMetricCard
            title="Admin-Aktionen"
            value={sortedLogs.filter((log) => log.userRole === 'admin').length}
            icon={<Shield className="w-5 h-5" />}
            description="Von internen Teams ausgelöst"
          />
          <DashboardMetricCard
            title="Inspektor-Aktionen"
            value={sortedLogs.filter((log) => log.userRole === 'inspector').length}
            icon={<ClipboardList className="w-5 h-5" />}
            description="Vor-Ort-Aktivitäten"
          />
          <DashboardMetricCard
            title="Betroffene Ressourcen"
            value={new Set(sortedLogs.map((log) => `${log.resourceType}:${log.resourceId}`)).size}
            icon={<BarChart3 className="w-5 h-5" />}
            description="Eindeutige Datensätze"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Letzte Ereignisse</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Zeitpunkt</TableHead>
                  <TableHead>Benutzer</TableHead>
                  <TableHead>Aktion</TableHead>
                  <TableHead>Ressource</TableHead>
                  <TableHead>Änderungen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLogs.map((log) => {
                  const role = roleConfig[log.userRole];
                  const resourceLabel = resourceLabels[log.resourceType] ?? log.resourceType;
                  const actionLabel = actionLabels[log.action] ?? log.action;
                  const changeSummary = Object.entries(log.changes)
                    .map(([key, value]) => `${key}: ${String(value)}`)
                    .join(', ');
                  const orderHref = log.resourceType === 'order' ? `/admin/orders/${log.resourceId}` : undefined;

                  return (
                    <TableRow key={log.id}>
                      <TableCell>{dateFormatter.format(new Date(log.timestamp))}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{getUserLabel(log)}</div>
                          <Badge className={`${role.className} mt-1 font-medium`}>{role.label}</Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-foreground">{actionLabel}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{resourceLabel}</div>
                          {orderHref ? (
                            <Link href={orderHref}>
                              <a className="text-xs text-muted-foreground hover:underline">#{log.resourceId}</a>
                            </Link>
                          ) : (
                            <div className="text-xs text-muted-foreground">#{log.resourceId}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{changeSummary || 'Keine Detailänderungen'}</TableCell>
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

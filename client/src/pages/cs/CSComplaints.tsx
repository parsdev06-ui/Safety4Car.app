import { StatusBadge } from '@/components/StatusBadge';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
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
import { complaints, getCustomerById, getOrderById } from '@/lib/mock-data';
import { Complaint, TicketPriority } from '@/types';
import { AlertCircle, ClipboardList, LayoutDashboard, Ticket, Users } from 'lucide-react';

const sidebarItems = [
  { label: 'Dashboard', href: '/cs/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Tickets', href: '/cs/tickets', icon: <Ticket className="w-4 h-4" /> },
  { label: 'Kunden', href: '/cs/customers', icon: <Users className="w-4 h-4" /> },
  { label: 'Aufträge', href: '/cs/orders', icon: <ClipboardList className="w-4 h-4" /> },
  { label: 'Beschwerden', href: '/cs/complaints', active: true, icon: <AlertCircle className="w-4 h-4" /> },
];

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
  return <Badge className={config.className}>{config.label}</Badge>;
}

export default function CSComplaints() {
  const sortedComplaints = [...complaints].sort(
    (a: Complaint, b: Complaint) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <DashboardLayout role="cs" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Beschwerden</h1>
          <p className="text-muted-foreground">
            Eskalationen mit Status, Priorität, Auftragsbezug und dokumentierter Lösung.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alle Beschwerden ({sortedComplaints.length})</CardTitle>
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
                  <TableHead>Lösung</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedComplaints.map((complaint: Complaint) => {
                  const customer = getCustomerById(complaint.customerId);
                  const order = getOrderById(complaint.orderId);

                  return (
                    <TableRow key={complaint.id}>
                      <TableCell className="whitespace-normal">
                        <div className="font-medium">{complaint.subject}</div>
                        <p className="mt-1 text-sm text-muted-foreground">{complaint.description}</p>
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        <div className="font-medium">
                          {customer ? `${customer.firstName} ${customer.lastName}` : 'Unbekannter Kunde'}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{customer?.email ?? '—'}</p>
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        <div className="font-medium">{complaint.orderId}</div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {order?.appointmentDate ? `Termin ${formatDate(order.appointmentDate)}` : 'Kein Termin erfasst'}
                        </p>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={complaint.status} type="ticket" />
                      </TableCell>
                      <TableCell>
                        <PriorityBadge priority={complaint.priority} />
                      </TableCell>
                      <TableCell>{formatDate(complaint.createdAt, true)}</TableCell>
                      <TableCell className="whitespace-normal">
                        {complaint.resolution ? (
                          <div>
                            <p>{complaint.resolution}</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Gelöst am {formatDate(complaint.resolvedAt, true)}
                            </p>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">Noch keine Lösung dokumentiert</span>
                        )}
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

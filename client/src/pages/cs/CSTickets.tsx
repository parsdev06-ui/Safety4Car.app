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
import { getCustomerById, tickets } from '@/lib/mock-data';
import { Ticket as TicketType, TicketPriority } from '@/types';
import {
  AlertCircle,
  ClipboardList,
  LayoutDashboard,
  Ticket,
  UserRound,
  Users,
} from 'lucide-react';
import { Link } from 'wouter';

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

function formatDate(value: string, withTime = false) {
  return new Date(value).toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  });
}

function getCustomerName(customerId: string) {
  const customer = getCustomerById(customerId);
  return customer ? `${customer.firstName} ${customer.lastName}` : 'Unbekannter Kunde';
}

function PriorityBadge({ priority }: { priority: TicketPriority }) {
  const config = priorityConfig[priority];
  return <Badge className={config.className}>{config.label}</Badge>;
}

export default function CSTickets() {
  const sortedTickets = [...tickets].sort(
    (a: TicketType, b: TicketType) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <DashboardLayout role="cs" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Support-Tickets</h1>
          <p className="text-muted-foreground">
            Alle Kundenanfragen mit Status, Priorität und Zuständigkeit auf einen Blick.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alle Tickets ({sortedTickets.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Betreff</TableHead>
                  <TableHead>Kunde</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priorität</TableHead>
                  <TableHead>Erstellt</TableHead>
                  <TableHead>Zugewiesen an</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTickets.map((ticket: TicketType) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="whitespace-normal">
                      <Link href={`/cs/tickets/${ticket.id}`}>
                        <a className="font-medium text-primary hover:underline">{ticket.subject}</a>
                      </Link>
                      <p className="mt-1 text-sm text-muted-foreground">{ticket.description}</p>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{getCustomerName(ticket.customerId)}</div>
                      <div className="text-sm text-muted-foreground">{ticket.id}</div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={ticket.status} type="ticket" />
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={ticket.priority} />
                    </TableCell>
                    <TableCell>{formatDate(ticket.createdAt, true)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <UserRound className="h-4 w-4 text-muted-foreground" />
                        {ticket.assignedTo
                          ? assigneeLabels[ticket.assignedTo] ?? ticket.assignedTo
                          : 'Nicht zugewiesen'}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

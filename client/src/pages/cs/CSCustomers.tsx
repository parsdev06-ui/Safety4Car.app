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
import {
  customers,
  getComplaintsByCustomerId,
  getOrdersByCustomerId,
  getTicketsByCustomerId,
} from '@/lib/mock-data';
import { Customer } from '@/types';
import {
  AlertCircle,
  ClipboardList,
  LayoutDashboard,
  Ticket,
  Users,
} from 'lucide-react';
import { Link } from 'wouter';

const sidebarItems = [
  { label: 'Dashboard', href: '/cs/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Tickets', href: '/cs/tickets', icon: <Ticket className="w-4 h-4" /> },
  { label: 'Kunden', href: '/cs/customers', active: true, icon: <Users className="w-4 h-4" /> },
  { label: 'Aufträge', href: '/cs/orders', icon: <ClipboardList className="w-4 h-4" /> },
  { label: 'Beschwerden', href: '/cs/complaints', icon: <AlertCircle className="w-4 h-4" /> },
];

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function CSCustomers() {
  return (
    <DashboardLayout role="cs" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kundenübersicht</h1>
          <p className="text-muted-foreground">
            Alle Kunden mit Kontaktinformationen sowie ihren offenen Vorgängen.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alle Kunden ({customers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>E-Mail</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Ort</TableHead>
                  <TableHead>Registriert am</TableHead>
                  <TableHead>Vorgänge</TableHead>
                  <TableHead>Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer: Customer) => {
                  const customerOrders = getOrdersByCustomerId(customer.id);
                  const customerTickets = getTicketsByCustomerId(customer.id);
                  const customerComplaints = getComplaintsByCustomerId(customer.id);

                  return (
                    <TableRow key={customer.id}>
                      <TableCell className="whitespace-normal">
                        <Link href="/cs/orders">
                          <a className="font-medium text-primary hover:underline">
                            {customer.firstName} {customer.lastName}
                          </a>
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">{customer.id}</p>
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.city}</TableCell>
                      <TableCell>{formatDate(customer.createdAt)}</TableCell>
                      <TableCell className="whitespace-normal">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{customerOrders.length} Aufträge</Badge>
                          <Badge variant="secondary">{customerTickets.length} Tickets</Badge>
                          <Badge variant="secondary">{customerComplaints.length} Beschwerden</Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Aufträge: {customerOrders.map(order => order.id).join(', ') || 'Keine'}
                        </p>
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        <div className="flex flex-col gap-2 text-sm">
                          <Link href="/cs/orders">
                            <a className="font-medium text-primary hover:underline">Aufträge ansehen</a>
                          </Link>
                          {customerTickets[0] ? (
                            <Link href={`/cs/tickets/${customerTickets[0].id}`}>
                              <a className="font-medium text-primary hover:underline">Letztes Ticket öffnen</a>
                            </Link>
                          ) : (
                            <span className="text-muted-foreground">Kein Ticket vorhanden</span>
                          )}
                        </div>
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

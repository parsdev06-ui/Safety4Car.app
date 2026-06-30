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
  getCustomerById,
  payments,
} from '@/lib/mock-data';
import type { Payment } from '@/types';
import {
  AlertCircle,
  BarChart3,
  ClipboardList,
  CreditCard,
  DollarSign,
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
  hour: '2-digit',
  minute: '2-digit',
});

const paymentStatusConfig: Record<Payment['status'], { label: string; className: string }> = {
  pending: { label: 'Ausstehend', className: 'bg-amber-100 text-amber-800' },
  completed: { label: 'Abgeschlossen', className: 'bg-emerald-100 text-emerald-800' },
  failed: { label: 'Fehlgeschlagen', className: 'bg-red-100 text-red-800' },
  refunded: { label: 'Erstattet', className: 'bg-slate-100 text-slate-800' },
};

const paymentMethodLabels: Record<Payment['method'], string> = {
  credit_card: 'Kreditkarte',
  bank_transfer: 'Banküberweisung',
  paypal: 'PayPal',
};

const getSidebarItems = () => [
  { label: 'Dashboard', href: '/admin/dashboard', icon: <BarChart3 className="w-4 h-4" /> },
  { label: 'Aufträge', href: '/admin/orders', icon: <ClipboardList className="w-4 h-4" /> },
  { label: 'Partner', href: '/admin/partners', icon: <Users className="w-4 h-4" /> },
  { label: 'Reports', href: '/admin/reports', icon: <FileText className="w-4 h-4" /> },
  { label: 'Zahlungen', href: '/admin/payments', active: true, icon: <DollarSign className="w-4 h-4" /> },
  { label: 'Beschwerden', href: '/admin/complaints', icon: <AlertCircle className="w-4 h-4" /> },
  { label: 'Audit Logs', href: '/admin/audit-logs', icon: <History className="w-4 h-4" /> },
];

export default function AdminPayments() {
  const totalRevenue = payments
    .filter((payment) => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <DashboardLayout role="admin" sidebarItems={getSidebarItems()}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Zahlungsübersicht</h1>
          <p className="text-muted-foreground">
            Zahlungsstatus, Methoden und Transaktionen für alle Kundenaufträge.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DashboardMetricCard
            title="Zahlungen gesamt"
            value={payments.length}
            icon={<CreditCard className="w-5 h-5" />}
            description="Im Zahlungssystem erfasst"
          />
          <DashboardMetricCard
            title="Erfolgreich"
            value={payments.filter((payment) => payment.status === 'completed').length}
            icon={<BarChart3 className="w-5 h-5" />}
            description="Abgeschlossen verbucht"
          />
          <DashboardMetricCard
            title="Umsatz"
            value={currencyFormatter.format(totalRevenue)}
            icon={<DollarSign className="w-5 h-5" />}
            description="Bestätigte Einnahmen"
          />
          <DashboardMetricCard
            title="Offen / Problematisch"
            value={payments.filter((payment) => payment.status !== 'completed').length}
            icon={<AlertCircle className="w-5 h-5" />}
            description="Benötigt Nachverfolgung"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alle Zahlungen</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bestellung</TableHead>
                  <TableHead>Kunde</TableHead>
                  <TableHead>Betrag</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Methode</TableHead>
                  <TableHead>Datum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => {
                  const customer = getCustomerById(payment.customerId);
                  const status = paymentStatusConfig[payment.status];

                  return (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div>
                          <Link href={`/admin/orders/${payment.orderId}`}>
                            <a className="font-medium text-foreground hover:underline">#{payment.orderId}</a>
                          </Link>
                          <div className="text-xs text-muted-foreground">Txn {payment.transactionId}</div>
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
                      <TableCell>{currencyFormatter.format(payment.amount)}</TableCell>
                      <TableCell>
                        <Badge className={`${status.className} font-medium`}>{status.label}</Badge>
                      </TableCell>
                      <TableCell>{paymentMethodLabels[payment.method]}</TableCell>
                      <TableCell>{dateFormatter.format(new Date(payment.completedAt ?? payment.createdAt))}</TableCell>
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

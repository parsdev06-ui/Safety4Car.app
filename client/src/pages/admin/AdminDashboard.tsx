import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { orders, payments, partners, inspectors, complaints } from '@/lib/mock-data';
import { BarChart3, Users, DollarSign, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const sidebarItems = [
    { label: 'Dashboard', href: '/admin/dashboard', active: true, icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Aufträge', href: '/admin/orders', icon: <AlertCircle className="w-4 h-4" /> },
    { label: 'Partner', href: '/admin/partners', icon: <Users className="w-4 h-4" /> },
    { label: 'Reports', href: '/admin/reports', icon: <AlertCircle className="w-4 h-4" /> },
    { label: 'Zahlungen', href: '/admin/payments', icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Beschwerden', href: '/admin/complaints', icon: <AlertCircle className="w-4 h-4" /> },
    { label: 'Audit Logs', href: '/admin/audit-logs', icon: <AlertCircle className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout role="admin" sidebarItems={sidebarItems}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Übersicht über alle Aktivitäten und Metriken.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <DashboardMetricCard
            title="Gesamtaufträge"
            value={orders.length}
            icon={<AlertCircle className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Partner"
            value={partners.length}
            icon={<Users className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Inspektoren"
            value={inspectors.length}
            icon={<Users className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Gesamtumsatz"
            value={`${totalRevenue}€`}
            icon={<DollarSign className="w-5 h-5" />}
          />
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Auftragsstatistiken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Abgeschlossen</span>
                  <span className="font-semibold">{orders.filter(o => o.status === 'completed').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">In Bearbeitung</span>
                  <span className="font-semibold">{orders.filter(o => ['inspection_in_progress', 'report_pending'].includes(o.status)).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Ausstehend</span>
                  <span className="font-semibold">{orders.filter(o => ['payment_pending', 'partner_matching'].includes(o.status)).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Storniert/Rückerstattung</span>
                  <span className="font-semibold">{orders.filter(o => ['cancelled', 'refunded'].includes(o.status)).length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Zahlungsstatistiken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Abgeschlossen</span>
                  <span className="font-semibold">{payments.filter(p => p.status === 'completed').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Ausstehend</span>
                  <span className="font-semibold">{payments.filter(p => p.status === 'pending').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Fehlgeschlagen</span>
                  <span className="font-semibold">{payments.filter(p => p.status === 'failed').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Rückerstattung</span>
                  <span className="font-semibold">{payments.filter(p => p.status === 'refunded').length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Complaints */}
        <Card>
          <CardHeader>
            <CardTitle>Offene Beschwerden</CardTitle>
          </CardHeader>
          <CardContent>
            {complaints.filter(c => c.status === 'open').length === 0 ? (
              <p className="text-muted-foreground text-center py-4">Keine offenen Beschwerden</p>
            ) : (
              <div className="space-y-3">
                {complaints.filter(c => c.status === 'open').map(complaint => (
                  <div key={complaint.id} className="p-3 border border-border rounded-lg">
                    <h4 className="font-semibold text-foreground">{complaint.subject}</h4>
                    <p className="text-sm text-muted-foreground">{complaint.description}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import { OrderTimeline } from '@/components/dashboard/OrderTimeline';
import { StatusBadge } from '@/components/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { orders, getCustomerById, getVehicleById, getPackageById } from '@/lib/mock-data';
import { Package, FileText, Clock, CheckCircle } from 'lucide-react';

export default function CustomerDashboard() {
  const customerId = 'cust-1';
  const customer = getCustomerById(customerId);
  const customerOrders = orders.filter(o => o.customerId === customerId);

  const sidebarItems = [
    { label: 'Dashboard', href: '/customer/dashboard', active: true, icon: <Package className="w-4 h-4" /> },
    { label: 'Meine Buchungen', href: '#', icon: <Clock className="w-4 h-4" /> },
    { label: 'Reports', href: '#', icon: <FileText className="w-4 h-4" /> },
    { label: 'Neue Inspektion', href: '/booking/package', icon: <CheckCircle className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout
      role="client"
      sidebarItems={sidebarItems}
      userName={customer?.firstName}
    >
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Willkommen, {customer?.firstName}!
          </h1>
          <p className="text-muted-foreground">
            Hier können Sie Ihre Inspektionen verwalten und Reports einsehen.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <DashboardMetricCard
            title="Inspektionen gesamt"
            value={customerOrders.length}
            icon={<Package className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Abgeschlossen"
            value={customerOrders.filter(o => o.status === 'completed').length}
            icon={<CheckCircle className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="In Bearbeitung"
            value={customerOrders.filter(o => ['inspection_in_progress', 'report_pending'].includes(o.status)).length}
            icon={<Clock className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Gesamtausgaben"
            value={`${customerOrders.reduce((sum, o) => sum + o.totalPrice, 0)}€`}
            description="Alle Inspektionen"
          />
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Meine Inspektionen</CardTitle>
          </CardHeader>
          <CardContent>
            {customerOrders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Noch keine Inspektionen gebucht</p>
                <Link href="/booking/package">
                  <a>
                    <Button>Jetzt buchen</Button>
                  </a>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {customerOrders.map((order) => {
                  const vehicle = getVehicleById(order.vehicleId);
                  const pkg = getPackageById(order.packageId);

                  return (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {vehicle?.make} {vehicle?.model}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {pkg?.name} • {order.appointmentDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <StatusBadge status={order.status} type="order" />
                        <Link href={`/customer/orders/${order.id}`}>
                          <a>
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </a>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current Order Timeline */}
        {customerOrders.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Aktuelle Inspektion</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderTimeline currentStatus={customerOrders[0].status} />
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

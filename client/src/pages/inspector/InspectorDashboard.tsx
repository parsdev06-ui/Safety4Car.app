import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { orders, getInspectorById, getVehicleById, getCustomerById } from '@/lib/mock-data';
import { CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';

export default function InspectorDashboard() {
  const inspectorId = 'insp-1';
  const inspector = getInspectorById(inspectorId);
  const inspectorOrders = orders.filter(o => o.inspectorId === inspectorId);
  const inProgressOrders = inspectorOrders.filter(o =>
    ['inspection_ready', 'inspection_in_progress'].includes(o.status)
  );

  const sidebarItems = [
    { label: 'Dashboard', href: '/inspector/dashboard', active: true, icon: <CheckCircle className="w-4 h-4" /> },
    { label: 'Aufträge', href: '/inspector/orders', icon: <Clock className="w-4 h-4" /> },
    { label: 'Inspektionen', href: '#', icon: <AlertCircle className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout
      role="inspector"
      sidebarItems={sidebarItems}
      userName={inspector?.firstName}
    >
      <div className="space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Willkommen, {inspector?.firstName}!
          </h1>
          <p className="text-muted-foreground">
            Verwalten Sie Ihre Inspektionen und Aufträge.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <DashboardMetricCard
            title="Inspektionen gesamt"
            value={inspector?.completedInspections || 0}
            icon={<CheckCircle className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Ausstehend"
            value={inProgressOrders.length}
            icon={<Clock className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Rating"
            value={`${inspector?.rating.toFixed(1)}/5`}
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Zertifizierungen"
            value={inspector?.certifications.length || 0}
            description="Aktive Zertifikate"
          />
        </div>

        {/* Pending Inspections */}
        <Card>
          <CardHeader>
            <CardTitle>Ausstehende Inspektionen</CardTitle>
          </CardHeader>
          <CardContent>
            {inProgressOrders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Keine ausstehenden Inspektionen</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inProgressOrders.map((order) => {
                  const vehicle = getVehicleById(order.vehicleId);
                  const customer = getCustomerById(order.customerId);

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
                          {customer?.firstName} {customer?.lastName} • {order.appointmentDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <StatusBadge status={order.status} type="order" />
                        <Link href={`/inspector/orders/${order.id}`}>
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

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Zertifizierungen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {inspector?.certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium"
                >
                  {cert}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

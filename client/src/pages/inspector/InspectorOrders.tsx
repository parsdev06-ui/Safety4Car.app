import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { orders, getVehicleById, getCustomerById } from '@/lib/mock-data';
import { Clock } from 'lucide-react';

export default function InspectorOrders() {
  const inspectorId = 'insp-1';
  const inspectorOrders = orders.filter(o => o.inspectorId === inspectorId);

  const sidebarItems = [
    { label: 'Dashboard', href: '/inspector/dashboard', icon: <Clock className="w-4 h-4" /> },
    { label: 'Aufträge', href: '/inspector/orders', active: true, icon: <Clock className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout role="inspector" sidebarItems={sidebarItems}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Meine Aufträge
          </h1>
          <p className="text-muted-foreground">
            Verwalten Sie Ihre Inspektionsaufträge.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alle Aufträge</CardTitle>
          </CardHeader>
          <CardContent>
            {inspectorOrders.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Keine Aufträge vorhanden</p>
            ) : (
              <div className="space-y-4">
                {inspectorOrders.map((order) => {
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
      </div>
    </DashboardLayout>
  );
}

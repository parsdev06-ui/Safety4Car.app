import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import { OrderTimeline } from '@/components/dashboard/OrderTimeline';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  getCustomerById,
  getInspectorById,
  getOrderById,
  getPackageById,
  getPartnerById,
  getVehicleById,
} from '@/lib/mock-data';
import type { Order } from '@/types';
import {
  CalendarDays,
  CarFront,
  AlertCircle,
  ClipboardList,
  LayoutDashboard,
  MapPin,
  ShieldCheck,
  UserRound,
  Wrench,
} from 'lucide-react';
import { Link, useParams } from 'wouter';

const sidebarItems = [
  { label: 'Dashboard', href: '/customer/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Meine Aufträge', href: '/customer/orders/ord-1', icon: <ClipboardList className="w-4 h-4" /> },
  { label: 'Beschwerde', href: '/customer/complaint', icon: <AlertCircle className="w-4 h-4" /> },
];

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : 'Noch nicht geplant';

const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
  }).format(amount);

export default function CustomerOrders() {
  const params = useParams<{ id: string }>();
  const order: Order | undefined = params.id ? getOrderById(params.id) : undefined;
  const customer = order ? getCustomerById(order.customerId) : getCustomerById('cust-1');
  const vehicle = order ? getVehicleById(order.vehicleId) : undefined;
  const pkg = order ? getPackageById(order.packageId) : undefined;
  const partner = order?.partnerId ? getPartnerById(order.partnerId) : undefined;
  const inspector = order?.inspectorId ? getInspectorById(order.inspectorId) : undefined;

  if (!order) {
    return (
      <DashboardLayout role="client" sidebarItems={sidebarItems} userName={customer?.firstName}>
        <Card>
          <CardHeader>
            <CardTitle>Auftrag nicht gefunden</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Der angeforderte Auftrag konnte nicht geladen werden.
            </p>
            <Link href="/customer/dashboard">
              <a>
                <Button>Zurück zum Dashboard</Button>
              </a>
            </Link>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="client" sidebarItems={sidebarItems} userName={customer?.firstName}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Auftrag {order.id}</h1>
            <p className="text-muted-foreground">
              Alle Details zu Ihrem Prüftermin, dem Fahrzeug und dem zuständigen Partner.
            </p>
          </div>
          <StatusBadge status={order.status} type="order" />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <DashboardMetricCard
            title="Fahrzeug"
            value={vehicle ? `${vehicle.make} ${vehicle.model}` : 'Nicht verfügbar'}
            description={vehicle?.licensePlate}
            icon={<CarFront className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Paket"
            value={pkg?.name ?? 'Nicht zugewiesen'}
            description={pkg ? `${pkg.estimatedDuration} Std. Prüfdauer` : undefined}
            icon={<ShieldCheck className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Gesamtpreis"
            value={formatCurrency(order.totalPrice, order.currency)}
            description="Gebuchter Auftrag"
            icon={<Wrench className="w-5 h-5" />}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fahrzeug- und Paketdetails</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <h2 className="font-semibold text-foreground">Fahrzeug</h2>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <span className="text-muted-foreground">Modell</span>
                      <span>{vehicle ? `${vehicle.make} ${vehicle.model}` : '—'}</span>
                      <span className="text-muted-foreground">Baujahr</span>
                      <span>{vehicle?.year ?? '—'}</span>
                      <span className="text-muted-foreground">Kilometerstand</span>
                      <span>{vehicle ? `${vehicle.mileage.toLocaleString('de-DE')} km` : '—'}</span>
                      <span className="text-muted-foreground">Kennzeichen</span>
                      <span>{vehicle?.licensePlate ?? '—'}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h2 className="font-semibold text-foreground">Gebuchtes Paket</h2>
                    <p className="text-sm text-muted-foreground">{pkg?.description ?? 'Keine Beschreibung vorhanden.'}</p>
                    <ul className="space-y-2 text-sm text-foreground">
                      {pkg?.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {order.notes && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <h2 className="font-semibold text-foreground">Hinweise zum Auftrag</h2>
                      <p className="text-sm text-muted-foreground">{order.notes}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Termin- und Partnerinformationen</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4 rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Prüftermin</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.appointmentDate)} um {order.appointmentTime ?? 'offen'} Uhr
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Ort</p>
                      <p className="text-sm text-muted-foreground">
                        {order.appointmentLocation ?? 'Wird noch abgestimmt'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Wrench className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Partner</p>
                      <p className="text-sm text-muted-foreground">
                        {partner?.name ?? 'Noch kein Partner zugewiesen'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserRound className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Zuständiger Inspektor</p>
                      <p className="text-sm text-muted-foreground">
                        {inspector ? `${inspector.firstName} ${inspector.lastName}` : 'Wird noch zugewiesen'}
                      </p>
                    </div>
                  </div>
                  {partner && (
                    <p className="text-sm text-muted-foreground">
                      Kontakt: {partner.phone} • {partner.email}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Statusverlauf</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderTimeline currentStatus={order.status} />
              </CardContent>
            </Card>

            {order.status === 'completed' && (
              <Card>
                <CardHeader>
                  <CardTitle>Prüfbericht</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Ihr Auftrag ist abgeschlossen. Den vollständigen Prüfbericht können Sie jetzt einsehen.
                  </p>
                  <Link href={`/customer/reports/${order.id}`}>
                    <a>
                      <Button className="w-full">Prüfbericht ansehen</Button>
                    </a>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

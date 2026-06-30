import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
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
  ClipboardList,
  LayoutDashboard,
  MapPin,
  PlayCircle,
  ShieldCheck,
  UserRound,
  Wrench,
} from 'lucide-react';
import { Link, useParams } from 'wouter';

const sidebarItems = [
  { label: 'Dashboard', href: '/inspector/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Aufträge', href: '/inspector/orders', icon: <ClipboardList className="w-4 h-4" /> },
];

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : '—';

export default function InspectorOrderDetail() {
  const params = useParams<{ id: string }>();
  const order: Order | undefined = params.id ? getOrderById(params.id) : undefined;
  const fallbackInspector = getInspectorById('insp-1');
  const inspector = order?.inspectorId ? getInspectorById(order.inspectorId) : fallbackInspector;
  const customer = order ? getCustomerById(order.customerId) : undefined;
  const vehicle = order ? getVehicleById(order.vehicleId) : undefined;
  const partner = order?.partnerId ? getPartnerById(order.partnerId) : undefined;
  const pkg = order ? getPackageById(order.packageId) : undefined;

  if (!order) {
    return (
      <DashboardLayout role="inspector" sidebarItems={sidebarItems} userName={fallbackInspector?.firstName}>
        <Card>
          <CardHeader>
            <CardTitle>Auftrag nicht gefunden</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Der angeforderte Auftrag konnte nicht geladen werden.</p>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="inspector" sidebarItems={sidebarItems} userName={inspector?.firstName}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Auftragsdetails {order.id}</h1>
            <p className="text-muted-foreground">
              Vollständige Einsatzdaten für die Fahrzeugprüfung vor Ort.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={order.status} type="order" />
            <Link href={`/inspector/inspection/${order.id}`}>
              <a>
                <Button>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Inspektion starten
                </Button>
              </a>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <DashboardMetricCard
            title="Kunde"
            value={customer ? `${customer.firstName} ${customer.lastName}` : 'Nicht verfügbar'}
            description={customer?.phone}
            icon={<UserRound className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Fahrzeug"
            value={vehicle ? `${vehicle.make} ${vehicle.model}` : 'Nicht verfügbar'}
            description={vehicle?.licensePlate}
            icon={<CarFront className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Paket"
            value={pkg?.name ?? 'Nicht zugewiesen'}
            description={pkg ? `${pkg.estimatedDuration} Std.` : undefined}
            icon={<ShieldCheck className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Partner"
            value={partner?.name ?? 'Noch offen'}
            description={partner?.city}
            icon={<Wrench className="w-5 h-5" />}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kundendaten</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm md:grid-cols-2">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium">{customer ? `${customer.firstName} ${customer.lastName}` : '—'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">E-Mail</p>
                  <p className="font-medium">{customer?.email ?? '—'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Telefon</p>
                  <p className="font-medium">{customer?.phone ?? '—'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Adresse</p>
                  <p className="font-medium">
                    {customer ? `${customer.address}, ${customer.postalCode} ${customer.city}` : '—'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fahrzeugdetails</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 text-sm md:grid-cols-2 xl:grid-cols-3">
                  <div>
                    <p className="text-muted-foreground">Marke</p>
                    <p className="font-medium">{vehicle?.make ?? '—'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Modell</p>
                    <p className="font-medium">{vehicle?.model ?? '—'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Baujahr</p>
                    <p className="font-medium">{vehicle?.year ?? '—'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Kilometerstand</p>
                    <p className="font-medium">
                      {vehicle ? `${vehicle.mileage.toLocaleString('de-DE')} km` : '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">VIN</p>
                    <p className="font-medium">{vehicle?.vin ?? '—'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Kennzeichen</p>
                    <p className="font-medium">{vehicle?.licensePlate ?? '—'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Farbe</p>
                    <p className="font-medium">{vehicle?.color ?? '—'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Kraftstoff</p>
                    <p className="font-medium">{vehicle?.fuelType ?? '—'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Getriebe</p>
                    <p className="font-medium">{vehicle?.transmission ?? '—'}</p>
                  </div>
                </div>
                {order.notes && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium text-foreground">Auftragshinweise</p>
                      <p className="text-sm text-muted-foreground">{order.notes}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Termin</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Datum und Uhrzeit</p>
                    <p className="text-muted-foreground">
                      {formatDate(order.appointmentDate)} • {order.appointmentTime ?? 'offen'} Uhr
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Ort</p>
                    <p className="text-muted-foreground">{order.appointmentLocation ?? 'Wird abgestimmt'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prüfpaket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="font-medium text-foreground">{pkg?.name ?? 'Nicht zugewiesen'}</p>
                <p className="text-muted-foreground">{pkg?.description ?? 'Keine Beschreibung vorhanden.'}</p>
                <ul className="space-y-2">
                  {pkg?.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Partner und Ansprechpartner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="font-medium text-foreground">{partner?.name ?? 'Noch offen'}</p>
                <p className="text-muted-foreground">
                  {partner ? `${partner.address}, ${partner.postalCode} ${partner.city}` : 'Partnerdaten folgen nach Zuweisung.'}
                </p>
                {inspector && (
                  <p className="text-muted-foreground">
                    Zuständig: {inspector.firstName} {inspector.lastName} • {inspector.phone}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

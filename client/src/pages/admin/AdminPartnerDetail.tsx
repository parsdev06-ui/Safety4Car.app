import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  complaints,
  getCustomerById,
  getPartnerById,
  getVehicleById,
  inspectors,
  orders,
} from '@/lib/mock-data';
import type { Inspector, Partner } from '@/types';
import {
  AlertCircle,
  BarChart3,
  ClipboardList,
  DollarSign,
  FileText,
  Globe,
  History,
  Mail,
  Phone,
  Star,
  Users,
} from 'lucide-react';
import { Link, useParams } from 'wouter';

const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const partnerStatusConfig: Record<Partner['status'], { label: string; className: string }> = {
  active: { label: 'Aktiv', className: 'bg-emerald-100 text-emerald-800' },
  inactive: { label: 'Inaktiv', className: 'bg-slate-100 text-slate-800' },
  pending_verification: { label: 'Prüfung ausstehend', className: 'bg-amber-100 text-amber-800' },
};

const inspectorStatusConfig: Record<Inspector['status'], { label: string; className: string }> = {
  active: { label: 'Aktiv', className: 'bg-emerald-100 text-emerald-800' },
  inactive: { label: 'Inaktiv', className: 'bg-slate-100 text-slate-800' },
  on_leave: { label: 'Abwesend', className: 'bg-amber-100 text-amber-800' },
};

const getSidebarItems = () => [
  { label: 'Dashboard', href: '/admin/dashboard', icon: <BarChart3 className="w-4 h-4" /> },
  { label: 'Aufträge', href: '/admin/orders', icon: <ClipboardList className="w-4 h-4" /> },
  { label: 'Partner', href: '/admin/partners', active: true, icon: <Users className="w-4 h-4" /> },
  { label: 'Reports', href: '/admin/reports', icon: <FileText className="w-4 h-4" /> },
  { label: 'Zahlungen', href: '/admin/payments', icon: <DollarSign className="w-4 h-4" /> },
  { label: 'Beschwerden', href: '/admin/complaints', icon: <AlertCircle className="w-4 h-4" /> },
  { label: 'Audit Logs', href: '/admin/audit-logs', icon: <History className="w-4 h-4" /> },
];

const formatDate = (value?: string) => (value ? dateFormatter.format(new Date(value)) : '—');

export default function AdminPartnerDetail() {
  const params = useParams<{ id: string }>();
  const partner = params.id ? getPartnerById(params.id) : undefined;

  if (!partner) {
    return (
      <DashboardLayout role="admin" sidebarItems={getSidebarItems()}>
        <Card>
          <CardHeader>
            <CardTitle>Partner nicht gefunden</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Für die angeforderte Partner-ID sind keine Stammdaten vorhanden.
            </p>
            <Link href="/admin/partners">
              <a>
                <Button variant="outline">Zur Partnerliste</Button>
              </a>
            </Link>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  const partnerInspectors = inspectors.filter((inspector) => inspector.partnerId === partner.id);
  const partnerOrders = orders.filter((order) => order.partnerId === partner.id);
  const activeOrders = partnerOrders.filter((order) => order.status !== 'completed').length;
  const partnerComplaints = complaints.filter((complaint) =>
    partnerOrders.some((order) => order.id === complaint.orderId),
  );
  const partnerStatus = partnerStatusConfig[partner.status];

  return (
    <DashboardLayout role="admin" sidebarItems={getSidebarItems()}>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">{partner.name}</h1>
              <Badge className={`${partnerStatus.className} font-medium`}>{partnerStatus.label}</Badge>
            </div>
            <p className="text-muted-foreground">
              Kontaktinformationen, Teamübersicht und Performance dieses Partners.
            </p>
          </div>
          <Link href="/admin/partners">
            <a>
              <Button variant="outline">Zurück zur Partnerliste</Button>
            </a>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DashboardMetricCard
            title="Ø Bewertung"
            value={`${partner.averageRating.toFixed(1)} / 5`}
            icon={<Star className="w-5 h-5" />}
            description="Kundenzufriedenheit"
          />
          <DashboardMetricCard
            title="Inspektoren"
            value={partnerInspectors.length}
            icon={<Users className="w-5 h-5" />}
            description="Zugeordnetes Prüferteam"
          />
          <DashboardMetricCard
            title="Aufträge"
            value={partnerOrders.length}
            icon={<ClipboardList className="w-5 h-5" />}
            description={`${activeOrders} aktuell aktiv`}
          />
          <DashboardMetricCard
            title="Beschwerden"
            value={partnerComplaints.length}
            icon={<AlertCircle className="w-5 h-5" />}
            description={`${partner.completedInspections} Prüfungen abgeschlossen`}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kontakt & Standort</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-foreground">{partner.email}</div>
                    <div className="text-muted-foreground">Zentrale E-Mail</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-foreground">{partner.phone}</div>
                    <div className="text-muted-foreground">Telefonischer Kontakt</div>
                  </div>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <div className="font-medium text-foreground">{partner.address}</div>
                  <div className="text-muted-foreground">
                    {partner.postalCode} {partner.city}, {partner.country}
                  </div>
                </div>
                {partner.website && (
                  <div className="flex items-start gap-3 rounded-lg border border-border p-3">
                    <Globe className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-foreground">{partner.website}</div>
                      <div className="text-muted-foreground">Öffentliche Website</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Qualitätskennzahlen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Beitritt</span>
                  <span className="font-medium text-foreground">{formatDate(partner.joinedAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Aktive Prüfer</span>
                  <span className="font-medium text-foreground">
                    {partnerInspectors.filter((inspector) => inspector.status === 'active').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Abgeschlossene Inspektionen</span>
                  <span className="font-medium text-foreground">{partner.completedInspections}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Beschwerdequote</span>
                  <span className="font-medium text-foreground">
                    {partner.completedInspections > 0
                      ? `${((partnerComplaints.length / partner.completedInspections) * 100).toFixed(1)} %`
                      : '0 %'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Inspektoren</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Zertifikate</TableHead>
                      <TableHead>Bewertung</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Abgeschlossen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partnerInspectors.map((inspector) => {
                      const inspectorStatus = inspectorStatusConfig[inspector.status];

                      return (
                        <TableRow key={inspector.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-foreground">
                                {inspector.firstName} {inspector.lastName}
                              </div>
                              <div className="text-xs text-muted-foreground">{inspector.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{inspector.certifications.join(', ')}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 font-medium text-foreground">
                              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                              {inspector.rating.toFixed(1)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${inspectorStatus.className} font-medium`}>
                              {inspectorStatus.label}
                            </Badge>
                          </TableCell>
                          <TableCell>{inspector.completedInspections}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Partneraufträge</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Auftrag</TableHead>
                      <TableHead>Kunde</TableHead>
                      <TableHead>Fahrzeug</TableHead>
                      <TableHead>Termin</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partnerOrders.map((order) => {
                      const customer = getCustomerById(order.customerId);
                      const vehicle = getVehicleById(order.vehicleId);

                      return (
                        <TableRow key={order.id}>
                          <TableCell>
                            <Link href={`/admin/orders/${order.id}`}>
                              <a className="font-medium text-foreground hover:underline">#{order.id}</a>
                            </Link>
                          </TableCell>
                          <TableCell>
                            {customer?.firstName} {customer?.lastName}
                          </TableCell>
                          <TableCell>
                            {vehicle?.make} {vehicle?.model}
                          </TableCell>
                          <TableCell>
                            {formatDate(order.appointmentDate)} {order.appointmentTime ? `• ${order.appointmentTime}` : ''}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={order.status} type="order" />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

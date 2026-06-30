import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import { RiskBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  getCustomerById,
  getOrderById,
  getPackageById,
  getReportByOrderId,
  getVehicleById,
} from '@/lib/mock-data';
import type { Report, ReportFinding } from '@/types';
import {
  AlertCircle,
  ClipboardList,
  Download,
  FileText,
  LayoutDashboard,
  ShieldAlert,
  ShieldCheck,
  TriangleAlert,
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
    : '—';

export default function CustomerReports() {
  const params = useParams<{ id: string }>();
  const order = params.id ? getOrderById(params.id) : undefined;
  const report: Report | undefined = params.id ? getReportByOrderId(params.id) : undefined;
  const customer = order ? getCustomerById(order.customerId) : getCustomerById('cust-1');
  const vehicle = order ? getVehicleById(order.vehicleId) : undefined;
  const pkg = order ? getPackageById(order.packageId) : undefined;

  if (!order || !report) {
    return (
      <DashboardLayout role="client" sidebarItems={sidebarItems} userName={customer?.firstName}>
        <Card>
          <CardHeader>
            <CardTitle>Kein Prüfbericht verfügbar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Für diesen Auftrag liegt aktuell noch kein freigegebener Prüfbericht vor.
            </p>
            <Link href={order ? `/customer/orders/${order.id}` : '/customer/dashboard'}>
              <a>
                <Button>Zum Auftrag</Button>
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
            <h1 className="text-3xl font-bold text-foreground">Prüfbericht zu Auftrag {order.id}</h1>
            <p className="text-muted-foreground">
              Bericht für {vehicle ? `${vehicle.make} ${vehicle.model}` : 'das ausgewählte Fahrzeug'}.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <RiskBadge level={report.riskLevel} />
            <Button type="button" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              PDF Download
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <DashboardMetricCard
            title="Risikostufe"
            value={report.riskLevel.toUpperCase()}
            description="Gesamteinschätzung"
            icon={<ShieldAlert className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Feststellungen"
            value={report.findings.length}
            description="Dokumentierte Prüfpunkte"
            icon={<TriangleAlert className="w-5 h-5" />}
          />
          <DashboardMetricCard
            title="Prüfumfang"
            value={pkg?.name ?? 'Nicht verfügbar'}
            description={`Freigegeben am ${formatDate(report.approvedAt ?? report.generatedAt)}`}
            icon={<ShieldCheck className="w-5 h-5" />}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Berichtsübersicht</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary" className="space-y-6">
              <TabsList>
                <TabsTrigger value="summary">Zusammenfassung</TabsTrigger>
                <TabsTrigger value="findings">Feststellungen</TabsTrigger>
                <TabsTrigger value="recommendations">Empfehlungen</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-4">
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-sm leading-6 text-foreground">{report.summary}</p>
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">Fahrzeug</p>
                    <p className="text-sm text-muted-foreground">
                      {vehicle ? `${vehicle.make} ${vehicle.model}, ${vehicle.year}` : 'Nicht verfügbar'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Erstellt am</p>
                    <p className="text-sm text-muted-foreground">{formatDate(report.generatedAt)}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Risikoeinschätzung auf Grundlage des gebuchten Prüfumfangs.
                </p>
              </TabsContent>

              <TabsContent value="findings" className="space-y-4">
                {report.findings.map((finding: ReportFinding) => (
                  <div key={finding.id} className="rounded-lg border p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{finding.category}</Badge>
                          <RiskBadge level={finding.severity} />
                        </div>
                        <p className="font-medium text-foreground">{finding.description}</p>
                        <p className="text-sm text-muted-foreground">Empfehlung: {finding.recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <div className="space-y-3">
                  {report.recommendations.map((recommendation) => (
                    <div key={recommendation} className="flex items-start gap-3 rounded-lg border p-4">
                      <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
                      <p className="text-sm text-foreground">{recommendation}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Risikoeinschätzung auf Grundlage des gebuchten Prüfumfangs.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Link href={`/customer/orders/${order.id}`}>
            <a>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Zum Auftragsdetail
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}

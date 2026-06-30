import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
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
import { partners } from '@/lib/mock-data';
import type { Partner } from '@/types';
import {
  AlertCircle,
  BarChart3,
  ClipboardList,
  DollarSign,
  FileText,
  History,
  Star,
  Users,
} from 'lucide-react';
import { Link } from 'wouter';

const partnerStatusConfig: Record<Partner['status'], { label: string; className: string }> = {
  active: { label: 'Aktiv', className: 'bg-emerald-100 text-emerald-800' },
  inactive: { label: 'Inaktiv', className: 'bg-slate-100 text-slate-800' },
  pending_verification: { label: 'Prüfung ausstehend', className: 'bg-amber-100 text-amber-800' },
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

export default function AdminPartners() {
  const totalInspectors = partners.reduce((sum, partner) => sum + partner.inspectorCount, 0);
  const totalCompletedInspections = partners.reduce(
    (sum, partner) => sum + partner.completedInspections,
    0,
  );
  const averageRating = partners.length
    ? (partners.reduce((sum, partner) => sum + partner.averageRating, 0) / partners.length).toFixed(1)
    : '0.0';

  return (
    <DashboardLayout role="admin" sidebarItems={getSidebarItems()}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Partnernetzwerk</h1>
          <p className="text-muted-foreground">
            Performance, Standorte und Kapazitäten aller angebundenen Partner im Überblick.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DashboardMetricCard
            title="Partner gesamt"
            value={partners.length}
            icon={<Users className="w-5 h-5" />}
            description="Aktive Service-Standorte"
          />
          <DashboardMetricCard
            title="Aktiv"
            value={partners.filter((partner) => partner.status === 'active').length}
            icon={<BarChart3 className="w-5 h-5" />}
            description="Einsatzbereit"
          />
          <DashboardMetricCard
            title="Inspektoren"
            value={totalInspectors}
            icon={<ClipboardList className="w-5 h-5" />}
            description="Gemeldete Prüfer"
          />
          <DashboardMetricCard
            title="Ø Bewertung"
            value={`${averageRating} / 5`}
            icon={<Star className="w-5 h-5" />}
            description={`${totalCompletedInspections} Inspektionen abgeschlossen`}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alle Partner</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner</TableHead>
                  <TableHead>Stadt</TableHead>
                  <TableHead>Inspektoren</TableHead>
                  <TableHead>Bewertung</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Abgeschlossene Inspektionen</TableHead>
                  <TableHead className="text-right">Aktion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partners.map((partner) => {
                  const status = partnerStatusConfig[partner.status];

                  return (
                    <TableRow key={partner.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{partner.name}</div>
                          <div className="text-xs text-muted-foreground">{partner.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-foreground">{partner.city}</div>
                        <div className="text-xs text-muted-foreground">{partner.postalCode}</div>
                      </TableCell>
                      <TableCell>{partner.inspectorCount}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 font-medium text-foreground">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          {partner.averageRating.toFixed(1)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${status.className} font-medium`}>{status.label}</Badge>
                      </TableCell>
                      <TableCell>{partner.completedInspections}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/partners/${partner.id}`}>
                          <a>
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </a>
                        </Link>
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

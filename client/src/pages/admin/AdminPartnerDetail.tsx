import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export default function AdminPartnerDetail() {
  const sidebarItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout role="admin" sidebarItems={sidebarItems}>
      <Card>
        <CardHeader>
          <CardTitle>Partnerdetails</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Partnerdetails werden hier angezeigt.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

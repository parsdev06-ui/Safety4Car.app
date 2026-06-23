import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export default function AdminReports() {
  const sidebarItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Reports', href: '/admin/reports', active: true, icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout role="admin" sidebarItems={sidebarItems}>
      <Card>
        <CardHeader>
          <CardTitle>Reports verwalten</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Reports werden hier angezeigt.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export default function AdminPartners() {
  const sidebarItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Partner', href: '/admin/partners', active: true, icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout role="admin" sidebarItems={sidebarItems}>
      <Card>
        <CardHeader>
          <CardTitle>Partner verwalten</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Partner werden hier angezeigt.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

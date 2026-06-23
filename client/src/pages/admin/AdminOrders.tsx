import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export default function AdminOrders() {
  const sidebarItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Aufträge', href: '/admin/orders', active: true, icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout role="admin" sidebarItems={sidebarItems}>
      <Card>
        <CardHeader>
          <CardTitle>Aufträge verwalten</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Aufträge werden hier angezeigt.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

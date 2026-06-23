import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export default function AdminComplaints() {
  const sidebarItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Beschwerden', href: '/admin/complaints', active: true, icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout role="admin" sidebarItems={sidebarItems}>
      <Card>
        <CardHeader>
          <CardTitle>Beschwerden verwalten</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Beschwerden werden hier angezeigt.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

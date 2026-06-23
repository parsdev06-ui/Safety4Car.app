import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Headphones } from 'lucide-react';

export default function CSComplaints() {
  const sidebarItems = [
    { label: 'Dashboard', href: '/cs/dashboard', icon: <Headphones className="w-4 h-4" /> },
    { label: 'Beschwerden', href: '/cs/complaints', active: true, icon: <Headphones className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout role="cs" sidebarItems={sidebarItems}>
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

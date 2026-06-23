import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Headphones } from 'lucide-react';

export default function CSCustomers() {
  const sidebarItems = [
    { label: 'Dashboard', href: '/cs/dashboard', icon: <Headphones className="w-4 h-4" /> },
    { label: 'Kunden', href: '/cs/customers', active: true, icon: <Headphones className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout role="cs" sidebarItems={sidebarItems}>
      <Card>
        <CardHeader>
          <CardTitle>Kundenverwaltung</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Kunden werden hier angezeigt.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

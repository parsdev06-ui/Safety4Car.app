import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';

export default function CustomerOrders() {
  const sidebarItems = [
    { label: 'Dashboard', href: '/customer/dashboard', icon: <Package className="w-4 h-4" /> },
    { label: 'Meine Buchungen', href: '#', active: true, icon: <Package className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout role="client" sidebarItems={sidebarItems}>
      <Card>
        <CardHeader>
          <CardTitle>Bestelldetails</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Bestelldetails werden hier angezeigt.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

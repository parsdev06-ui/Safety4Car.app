import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function CustomerComplaint() {
  const sidebarItems = [
    { label: 'Dashboard', href: '/customer/dashboard', icon: <AlertCircle className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout role="client" sidebarItems={sidebarItems}>
      <Card>
        <CardHeader>
          <CardTitle>Beschwerde einreichen</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Beschwerde-Formular wird hier angezeigt.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

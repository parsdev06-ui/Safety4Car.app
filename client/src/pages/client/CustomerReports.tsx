import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function CustomerReports() {
  const sidebarItems = [
    { label: 'Dashboard', href: '/customer/dashboard', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout role="client" sidebarItems={sidebarItems}>
      <Card>
        <CardHeader>
          <CardTitle>Inspektionsbericht</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Inspektionsbericht wird hier angezeigt.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

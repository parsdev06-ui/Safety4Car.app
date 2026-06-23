import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { ReactNode } from 'react';

interface DashboardMetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: ReactNode;
  description?: string;
}

export function DashboardMetricCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  description,
}: DashboardMetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            {changeType === 'increase' && (
              <ArrowUp className="w-4 h-4 text-emerald-600" />
            )}
            {changeType === 'decrease' && (
              <ArrowDown className="w-4 h-4 text-red-600" />
            )}
            <span
              className={`text-xs font-medium ${
                changeType === 'increase'
                  ? 'text-emerald-600'
                  : changeType === 'decrease'
                  ? 'text-red-600'
                  : 'text-muted-foreground'
              }`}
            >
              {change > 0 ? '+' : ''}{change}%
            </span>
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

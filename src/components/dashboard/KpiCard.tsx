import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Kpi } from '@/types';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
interface KpiCardProps {
  kpi: Kpi;
}
export function KpiCard({ kpi }: KpiCardProps) {
  const { title, value, icon: Icon, change, changeType } = kpi;
  const isIncrease = changeType === 'increase';
  return (
    <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          <span className={cn('flex items-center mr-1', isIncrease ? 'text-green-500' : 'text-red-500')}>
            {isIncrease ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {change}
          </span>
          from last month
        </p>
      </CardContent>
    </Card>
  );
}
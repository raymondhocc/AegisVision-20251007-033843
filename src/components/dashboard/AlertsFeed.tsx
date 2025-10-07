import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Alert } from '@/types';
interface AlertsFeedProps {
  alerts: Alert[];
}
export function AlertsFeed({ alerts }: AlertsFeedProps) {
  const severityColor = {
    Critical: 'bg-red-500',
    High: 'bg-orange-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-blue-500',
  };
  return (
    <Card className="bg-card/60 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Real-Time Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-28rem)]">
          <div className="space-y-4 pr-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3">
                <div className="flex-shrink-0 pt-1">
                  <span className={cn("h-2.5 w-2.5 rounded-full block", severityColor[alert.severity])} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {alert.streamName} &bull; {alert.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
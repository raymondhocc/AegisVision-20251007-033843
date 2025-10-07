import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, UserRoundX, ShieldAlert } from 'lucide-react';
import type { DangerousBehaviorAlert } from '@/types';
interface DangerousBehaviorFeedProps {
  alerts: DangerousBehaviorAlert[];
}
const alertIcons: { [key in DangerousBehaviorAlert['type']]: React.ElementType } = {
  'Fall Detected': UserRoundX,
  'Fight Detected': ShieldAlert,
  'Anomalous Behavior': AlertTriangle,
};
export function DangerousBehaviorFeed({ alerts }: DangerousBehaviorFeedProps) {
  return (
    <Card className="bg-red-900/20 border-red-500/30">
      <CardHeader>
        <CardTitle className="text-red-400">Critical Behavior Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[150px]">
          <div className="space-y-4 pr-4">
            {alerts.map((alert) => {
              const Icon = alertIcons[alert.type];
              return (
                <div key={alert.id} className="flex items-start gap-3">
                  <div className="flex-shrink-0 pt-1 text-red-500">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-400">{alert.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {alert.streamName} &bull; {alert.location} &bull; {alert.timestamp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
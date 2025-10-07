import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { ZoneCount } from '@/types';
interface ZonePeopleCountProps {
  zones: ZoneCount[];
}
export function ZonePeopleCount({ zones }: ZonePeopleCountProps) {
  return (
    <Card className="bg-card/60 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Zone People Count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {zones.map((zone) => {
            const percentage = (zone.count / zone.capacity) * 100;
            return (
              <div key={zone.id}>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span className="font-medium">{zone.name}</span>
                  <span className="text-muted-foreground">
                    {zone.count} / {zone.capacity}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
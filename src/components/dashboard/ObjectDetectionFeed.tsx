import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Backpack, Package, Wrench, ShieldAlert } from 'lucide-react';
import type { DetectedObject } from '@/types';
interface ObjectDetectionFeedProps {
  objects: DetectedObject[];
}
const objectIcons: { [key in DetectedObject['type']]: React.ElementType } = {
  Backpack: Backpack,
  Package: Package,
  Tool: Wrench,
  Weapon: ShieldAlert,
};
export function ObjectDetectionFeed({ objects }: ObjectDetectionFeedProps) {
  return (
    <Card className="bg-card/60 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Object Detection Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[150px]">
          <div className="space-y-4 pr-4">
            {objects.map((obj) => {
              const Icon = objectIcons[obj.type];
              const isWeapon = obj.type === 'Weapon';
              return (
                <div key={obj.id} className="flex items-start gap-3">
                  <div className={`flex-shrink-0 pt-1 ${isWeapon ? 'text-orange-400' : 'text-primary'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isWeapon ? 'text-orange-400' : ''}`}>{obj.type} Detected</p>
                    <p className="text-xs text-muted-foreground">
                      {obj.streamName} &bull; {obj.location} &bull; {obj.timestamp}
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
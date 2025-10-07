import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { LicensePlateRecognition } from '@/types';
interface AnprFeedProps {
  recognitions: LicensePlateRecognition[];
}
export function AnprFeed({ recognitions }: AnprFeedProps) {
  return (
    <Card className="bg-card/60 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>ANPR Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <div className="space-y-4 pr-4">
            {recognitions.map((rec) => (
              <div key={rec.id} className="flex items-center gap-4">
                <img
                  src={rec.vehicleImageUrl}
                  alt={`Vehicle with plate ${rec.plateNumber}`}
                  className="h-16 w-20 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="font-mono text-lg font-semibold tracking-wider">{rec.plateNumber}</p>
                  <p className="text-xs text-muted-foreground">
                    {rec.location} &bull; {rec.timestamp}
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
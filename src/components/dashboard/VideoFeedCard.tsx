import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Maximize, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Stream } from '@/types';
interface VideoFeedCardProps {
  stream: Stream;
  onMaximize: (stream: Stream) => void;
}
export function VideoFeedCard({ stream, onMaximize }: VideoFeedCardProps) {
  const statusColor = {
    Online: 'bg-green-500',
    Offline: 'bg-red-500',
    Warning: 'bg-yellow-500',
  };
  return (
    <Card className="overflow-hidden group relative border-border/50 hover:border-primary/50 transition-colors duration-200">
      <CardContent className="p-0">
        <div className="aspect-video relative">
          <img src={stream.thumbnailUrl} alt={stream.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute top-2 left-2 flex items-center gap-2">
            <Badge variant="secondary" className="bg-black/50 text-white border-none">
              <span className={cn("h-2 w-2 rounded-full mr-2", statusColor[stream.status])} />
              {stream.status}
            </Badge>
          </div>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white" onClick={() => onMaximize(stream)}>
              <Maximize className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute bottom-2 left-2 text-white">
            <h3 className="font-semibold">{stream.name}</h3>
            <p className="text-xs text-gray-300">{stream.location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
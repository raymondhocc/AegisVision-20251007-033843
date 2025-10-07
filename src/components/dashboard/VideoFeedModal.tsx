import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, MapPin, Camera, Radio, DiscAlbum } from 'lucide-react';
import type { Stream } from '@/types';
import { cn } from '@/lib/utils';
interface VideoFeedModalProps {
  stream: Stream | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
const statusColorMap: { [key in Stream['status']]: string } = {
  Online: 'bg-green-500',
  Offline: 'bg-red-500',
  Warning: 'bg-yellow-500',
};
export function VideoFeedModal({ stream, isOpen, onOpenChange }: VideoFeedModalProps) {
  if (!stream) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="aspect-video bg-black flex items-center justify-center">
              <img src={stream.thumbnailUrl.replace('/400/300', '/1280/720')} alt={`Live feed from ${stream.name}`} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="p-6 flex flex-col">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl">{stream.name}</DialogTitle>
              <DialogDescription>Live video feed details and controls.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 text-sm flex-grow">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-card text-card-foreground border-border">
                  <span className={cn("h-2 w-2 rounded-full mr-2", statusColorMap[stream.status])} />
                  {stream.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{stream.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Video className="h-4 w-4" />
                <span>{stream.resolution}</span>
              </div>
            </div>
            <div className="mt-6 space-y-2">
                <h4 className="font-semibold text-muted-foreground">Controls</h4>
                <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline"><Radio className="mr-2 h-4 w-4" /> PTZ Controls</Button>
                    <Button variant="outline"><Camera className="mr-2 h-4 w-4" /> Snapshot</Button>
                    <Button variant="outline" className="col-span-2"><DiscAlbum className="mr-2 h-4 w-4" /> Start Recording</Button>
                </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
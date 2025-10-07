import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Calendar, Video, MapPin } from 'lucide-react';
import type { Alert } from '@/types';
import { cn } from '@/lib/utils';
interface AlertDetailsDialogProps {
  alert: Alert | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
const severityStyles = {
  Critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  High: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};
export function AlertDetailsDialog({ alert, isOpen, onOpenChange }: AlertDetailsDialogProps) {
  if (!alert) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Alert Details</DialogTitle>
          <DialogDescription>{alert.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Video clip player placeholder</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <strong>Severity:</strong>
              <Badge variant="outline" className={cn(severityStyles[alert.severity])}>
                {alert.severity}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <strong>Timestamp:</strong>
              <span>{alert.timestamp}</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-muted-foreground" />
              <strong>Source:</strong>
              <span>{alert.streamName}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <strong>Location:</strong>
              <span>{alert.location}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
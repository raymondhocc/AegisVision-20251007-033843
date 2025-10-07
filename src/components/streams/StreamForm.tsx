import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import type { Stream, StreamStatus } from '@/types';
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  rtspUrl: z.string().url({ message: 'Please enter a valid RTSP URL.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
  status: z.enum(['Online', 'Offline', 'Warning']),
  resolution: z.string().min(2, { message: 'Resolution is required.' }),
});
export type StreamFormValues = z.infer<typeof formSchema>;
interface StreamFormProps {
  stream?: Stream | null;
  onSubmit: (values: StreamFormValues) => void;
  onClose: () => void;
}
export function StreamForm({ stream, onSubmit, onClose }: StreamFormProps) {
  const form = useForm<StreamFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: stream?.name || '',
      rtspUrl: stream?.rtspUrl || '',
      location: stream?.location || '',
      status: stream?.status || 'Online',
      resolution: stream?.resolution || '1080p',
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stream Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., CAM-01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Main Entrance" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="rtspUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RTSP URL</FormLabel>
              <FormControl>
                <Input placeholder="rtsp://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                    <SelectItem value="Warning">Warning</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resolution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resolution</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a resolution" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="4K">4K</SelectItem>
                    <SelectItem value="1440p">1440p</SelectItem>
                    <SelectItem value="1080p">1080p</SelectItem>
                    <SelectItem value="720p">720p</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit">Save Stream</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
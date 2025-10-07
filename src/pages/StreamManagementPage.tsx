import { useEffect } from 'react';
import { useStreamStore } from '@/stores/streamStore';
import { StreamDataTable } from '@/components/streams/StreamDataTable';
import { Skeleton } from '@/components/ui/skeleton';
export function StreamManagementPage() {
  const fetchStreams = useStreamStore((state) => state.fetchStreams);
  const isLoading = useStreamStore((state) => state.isLoading);
  const streams = useStreamStore((state) => state.streams);
  useEffect(() => {
    // Fetch streams only if the store is empty
    if (streams.length === 0) {
      fetchStreams();
    }
  }, [fetchStreams, streams.length]);
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Stream Management</h1>
      <p className="text-muted-foreground">
        Add, configure, and manage all your video streams from one place.
      </p>
      {isLoading && streams.length === 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <StreamDataTable />
      )}
    </div>
  );
}
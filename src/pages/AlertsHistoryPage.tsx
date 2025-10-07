import { useEffect } from 'react';
import { useAlertStore } from '@/stores/alertStore';
import { AlertsDataTable } from '@/components/alerts/AlertsDataTable';
import { Skeleton } from '@/components/ui/skeleton';
export function AlertsHistoryPage() {
  const fetchAlerts = useAlertStore((state) => state.fetchAlerts);
  const isLoading = useAlertStore((state) => state.isLoading);
  const alerts = useAlertStore((state) => state.alerts);
  useEffect(() => {
    if (alerts.length === 0) {
      fetchAlerts();
    }
  }, [fetchAlerts, alerts.length]);
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Alerts History</h1>
      <p className="text-muted-foreground">
        Review, search, and filter all historical alerts recorded by the system.
      </p>
      {isLoading && alerts.length === 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-64" />
          </div>
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <AlertsDataTable />
      )}
    </div>
  );
}
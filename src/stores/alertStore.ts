import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Alert } from '@/types';
import { getHistoricalAlerts } from '@/lib/mockApi';
type AlertState = {
  alerts: Alert[];
  isLoading: boolean;
  error: string | null;
  fetchAlerts: () => Promise<void>;
};
export const useAlertStore = create<AlertState>()(
  immer((set) => ({
    alerts: [],
    isLoading: false,
    error: null,
    fetchAlerts: async () => {
      set({ isLoading: true, error: null });
      try {
        const alerts = await getHistoricalAlerts();
        set({ alerts, isLoading: false });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch alerts';
        set({ error: errorMessage, isLoading: false });
        console.error(errorMessage);
      }
    },
  }))
);
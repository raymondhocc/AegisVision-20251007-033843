import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Stream } from '@/types';
import { getStreams } from '@/lib/mockApi';
import type { StreamFormValues } from '@/components/streams/StreamForm';
type StreamState = {
  streams: Stream[];
  isLoading: boolean;
  error: string | null;
  fetchStreams: () => Promise<void>;
  addStream: (streamData: StreamFormValues) => void;
  updateStream: (stream: Stream) => void;
  deleteStream: (streamId: string) => void;
};
export const useStreamStore = create<StreamState>()(
  immer((set) => ({
    streams: [],
    isLoading: false,
    error: null,
    fetchStreams: async () => {
      set({ isLoading: true, error: null });
      try {
        const streams = await getStreams();
        set({ streams, isLoading: false });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch streams';
        set({ error: errorMessage, isLoading: false });
        console.error(errorMessage);
      }
    },
    addStream: (streamData) => {
      const newStream: Stream = {
        ...streamData,
        id: `stream-${Date.now()}`,
        thumbnailUrl: `https://picsum.photos/seed/${Date.now()}/400/300`,
        // Fix: Add coords to satisfy the Stream type and allow rendering on the map.
        coords: [34.0522 + (Math.random() - 0.5) * 0.1, -118.2437 + (Math.random() - 0.5) * 0.1],
      };
      set((state) => {
        state.streams.push(newStream);
      });
    },
    updateStream: (updatedStream) => {
      set((state) => {
        const index = state.streams.findIndex((s) => s.id === updatedStream.id);
        if (index !== -1) {
          state.streams[index] = updatedStream;
        }
      });
    },
    deleteStream: (streamId) => {
      set((state) => {
        state.streams = state.streams.filter((s) => s.id !== streamId);
      });
    },
  }))
);
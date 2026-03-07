import { create } from 'zustand';

interface IRoomState {
  room: {
    width: number;
    length: number;
    height: number;
  };
  setDimensions: (dims: Partial<{ width: number; length: number; height: number }>) => void;
}

export const useRoomStore = create<IRoomState>((set) => ({
  room: { width: 5, length: 4, height: 2.5 },
  setDimensions: (dims) => set((state) => ({ room: { ...state.room, ...dims } })),
}));

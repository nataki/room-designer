import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IRoom } from '../types';
import { FURNITURE_TYPES } from '../constants/furniture.ts';
import { DEFAULT_ROOM_WIDTH, DEFAULT_ROOM_LENGTH, DEFAULT_ROOM_HEIGHT } from '../constants/room.ts';

const defaultRoom: IRoom = {
  id: crypto.randomUUID(),
  name: 'Room 1',
  width: DEFAULT_ROOM_WIDTH,
  length: DEFAULT_ROOM_LENGTH,
  height: DEFAULT_ROOM_HEIGHT,
  items: [],
};

export interface IRoomsState {
  rooms: IRoom[];
  activeRoomId: string;
  transforming: boolean;
  createRoom: () => void;
  deleteRoom: (id: string) => void;
  setActiveRoom: (id: string) => void;
  renameRoom: (id: string, name: string) => void;
  setDimensions: (dims: Partial<{ width: number; length: number; height: number }>) => void;
  addItem: (type: keyof typeof FURNITURE_TYPES) => void;
  moveItem: (id: string, position: [number, number, number]) => void;
  removeItem: (id: string) => void;
  setTransforming: (v: boolean) => void;
}

export const useRoomsStore = create<IRoomsState>()(
  persist(
    (set) => ({
      rooms: [defaultRoom],
      activeRoomId: defaultRoom.id,
      transforming: false,

      createRoom: () =>
        set((s) => {
          const newRoom: IRoom = {
            ...defaultRoom,
            id: crypto.randomUUID(),
            name: `Room ${s.rooms.length + 1}`,
          };
          return { rooms: [...s.rooms, newRoom], activeRoomId: newRoom.id };
        }),

      deleteRoom: (id) =>
        set((s) => {
          if (s.rooms.length <= 1) return s;
          const newRooms = s.rooms.filter((r) => r.id !== id);
          const newActiveId = s.activeRoomId === id ? newRooms[0].id : s.activeRoomId;
          return { rooms: newRooms, activeRoomId: newActiveId };
        }),

      setActiveRoom: (id) => set({ activeRoomId: id }),

      renameRoom: (id, name) =>
        set((s) => ({
          rooms: s.rooms.map((r) => (r.id === id ? { ...r, name } : r)),
        })),

      setDimensions: (dims) =>
        set((s) => ({
          rooms: s.rooms.map((r) => (r.id === s.activeRoomId ? { ...r, ...dims } : r)),
        })),

      addItem: (type) =>
        set((s) => ({
          rooms: s.rooms.map((r) =>
            r.id === s.activeRoomId
              ? {
                  ...r,
                  items: [
                    ...r.items,
                    {
                      id: crypto.randomUUID(),
                      type,
                      position: [0, 0, 0] as [number, number, number],
                    },
                  ],
                }
              : r
          ),
        })),

      moveItem: (id, position) =>
        set((s) => ({
          rooms: s.rooms.map((r) =>
            r.id === s.activeRoomId
              ? {
                  ...r,
                  items: r.items.map((item) => (item.id === id ? { ...item, position } : item)),
                }
              : r
          ),
        })),

      removeItem: (id) =>
        set((s) => ({
          rooms: s.rooms.map((r) =>
            r.id === s.activeRoomId ? { ...r, items: r.items.filter((item) => item.id !== id) } : r
          ),
        })),

      setTransforming: (v) => set({ transforming: v }),
    }),
    {
      name: 'rooms-store',
      partialize: (s) => ({ rooms: s.rooms, activeRoomId: s.activeRoomId }),
    }
  )
);

export const selectActiveRoom = (s: IRoomsState): IRoom => {
  if (s.rooms.length === 0) throw new Error('roomsStore: rooms array is empty');
  return s.rooms.find((r) => r.id === s.activeRoomId) ?? s.rooms[0];
};

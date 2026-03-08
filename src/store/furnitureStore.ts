import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IFurnitureInstance } from '../types';
import { FURNITURE_TYPES } from '../constants/furniture.ts';

interface IFurnitureState {
  items: IFurnitureInstance[];
  transforming: boolean;
  addItem: (type: keyof typeof FURNITURE_TYPES) => void;
  moveItem: (id: string, position: [number, number, number]) => void;
  removeItem: (id: string) => void;
  setTransforming: (v: boolean) => void;
}

export const useFurnitureStore = create<IFurnitureState>()(
  persist(
    (set) => ({
      items: [],
      transforming: false,
      setTransforming: (v) => set({ transforming: v }),
      addItem: (type) =>
        set((s) => ({
          items: [...s.items, { id: crypto.randomUUID(), type, position: [0, 0, 0] }],
        })),
      moveItem: (id, position) =>
        set((s) => ({
          items: s.items.map((item) => (item.id === id ? { ...item, position } : item)),
        })),
      removeItem: (id) => set((s) => ({ items: s.items.filter((item) => item.id !== id) })),
    }),
    {
      name: 'furniture',
      partialize: (s) => ({ items: s.items }),
    }
  )
);

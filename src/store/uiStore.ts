import { create } from 'zustand';
import type { TCameraView, TTheme } from '../types';

interface IUIState {
  cameraView: TCameraView;
  setCameraView: (view: TCameraView) => void;
  theme: TTheme;
  setTheme: (theme: TTheme) => void;
}

export const useUIStore = create<IUIState>((set) => ({
  cameraView: '3d',
  setCameraView: (view) => set({ cameraView: view }),
  theme: 'dark',
  setTheme: (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ theme });
  },
}));

// Apply dark class on initial load
document.documentElement.classList.add('dark');

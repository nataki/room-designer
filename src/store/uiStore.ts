import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TCameraView, TTheme } from '../types';

interface IUIState {
  cameraView: TCameraView;
  setCameraView: (view: TCameraView) => void;
  theme: TTheme;
  setTheme: (theme: TTheme) => void;
}

function applyTheme(theme: TTheme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export const useUIStore = create<IUIState>()(
  persist(
    (set) => ({
      cameraView: '3d',
      setCameraView: (view) => set({ cameraView: view }),
      theme: 'dark',
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
    }),
    {
      name: 'ui-store',
      partialize: (state) => ({ theme: state.theme, cameraView: state.cameraView }),
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.theme);
      },
    }
  )
);

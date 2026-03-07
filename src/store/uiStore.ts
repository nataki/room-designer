import { create } from 'zustand';
import type { TCameraView } from '../types';

interface IUIState {
  cameraView: TCameraView;
  setCameraView: (view: TCameraView) => void;
}

export const useUIStore = create<IUIState>((set) => ({
  cameraView: '3d',
  setCameraView: (view) => set({ cameraView: view }),
}));

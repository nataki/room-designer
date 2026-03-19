import { beforeEach, describe, expect, test } from 'vitest';
import { useUIStore } from './uiStore';

function getState() {
  return useUIStore.getState();
}

describe('uiStore', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    useUIStore.setState({ cameraView: '3d', theme: 'dark' });
  });

  describe('initial state', () => {
    test('has cameraView 3d and theme dark by default', () => {
      const s = getState();
      expect(s.cameraView).toBe('3d');
      expect(s.theme).toBe('dark');
    });
  });

  describe('setCameraView', () => {
    test('updates cameraView', () => {
      getState().setCameraView('top');
      expect(getState().cameraView).toBe('top');
    });

    test('can cycle through all views', () => {
      for (const view of ['top', 'front', 'side', '3d'] as const) {
        getState().setCameraView(view);
        expect(getState().cameraView).toBe(view);
      }
    });
  });

  describe('setTheme', () => {
    test('adds dark class to documentElement when set to dark', () => {
      getState().setTheme('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(getState().theme).toBe('dark');
    });

    test('removes dark class from documentElement when set to light', () => {
      document.documentElement.classList.add('dark');
      getState().setTheme('light');
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(getState().theme).toBe('light');
    });
  });
}); // uiStore

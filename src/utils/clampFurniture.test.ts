import { describe, test, expect } from 'vitest';
import { clampFurniturePosition } from './clampFurniture';

const room = { width: 5, height: 10, length: 4 };
const def = { w: 1, h: 0.5, d: 1 };

describe('clampFurniturePosition', () => {
  test('returns position unchanged when inside bounds', () => {
    expect(clampFurniturePosition({ x: 0, y: 0, z: 0 }, room, def)).toEqual({ x: 0, y: 0.25, z: 0 });
  });

  test('always snaps y to def.h / 2', () => {
    const { y } = clampFurniturePosition({ x: 0, y: 99, z: 0 }, room, def);
    expect(y).toBe(def.h / 2);
  });

  test('clamps x when dragged past right wall', () => {
    // halfW = 5/2 - 1/2 = 2
    const { x } = clampFurniturePosition({ x: 10, y: 0, z: 0 }, room, def);
    expect(x).toBe(2);
  });

  test('clamps x when dragged past left wall', () => {
    const { x } = clampFurniturePosition({ x: -10, y: 0, z: 0 }, room, def);
    expect(x).toBe(-2);
  });

  test('clamps z when dragged past front wall', () => {
    // halfL = 4/2 - 1/2 = 1.5
    const { z } = clampFurniturePosition({ x: 0, y: 0, z: 10 }, room, def);
    expect(z).toBe(1.5);
  });

  test('clamps z when dragged past back wall', () => {
    const { z } = clampFurniturePosition({ x: 0, y: 0, z: -10 }, room, def);
    expect(z).toBe(-1.5);
  });

  test('clamps to 0 when furniture is wider than room', () => {
    const widedef = { w: 10, h: 1, d: 10 };
    const { x, z } = clampFurniturePosition({ x: 3, y: 0, z: 3 }, room, widedef);
    expect(x).toBe(0);
    expect(z).toBe(0);
  });
});

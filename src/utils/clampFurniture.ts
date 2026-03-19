import type { IRoomParameters } from '../types';

// Coordinate axes: x = room width (left/right), y = room height (up/down), z = room length (front/back)
export function clampFurniturePosition(
  pos: { x: number; y: number; z: number },
  room: IRoomParameters,
  def: { w: number; h: number; d: number }
): { x: number; y: number; z: number } {
  const halfW = Math.max(0, room.width / 2 - def.w / 2);
  const halfL = Math.max(0, room.length / 2 - def.d / 2);
  return {
    x: Math.max(-halfW, Math.min(halfW, pos.x)), // clamped to room.width
    y: def.h / 2,                                 // rests on floor (y = height / 2)
    z: Math.max(-halfL, Math.min(halfL, pos.z)), // clamped to room.length
  };
}

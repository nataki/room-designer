import { FURNITURE_TYPES } from '../constants/furniture.ts';

export type TCameraView = '3d' | 'top' | 'front' | 'side';
export type TTheme = 'dark' | 'light';

export interface IFurnitureInstance {
  id: string;
  type: keyof typeof FURNITURE_TYPES;
  position: [number, number, number];
}

export interface IRoomParameters {
  width: number;
  length: number;
  height: number;
}

export interface IRoom extends IRoomParameters {
  id: string;
  name: string;
  items: IFurnitureInstance[];
}

export interface Pixel {
  id: string;
  x: number;
  y: number;
  fillStyle?: string;
  type: 'start' | 'end' | 'wall' | 'path' | 'visited' | 'empty';
}

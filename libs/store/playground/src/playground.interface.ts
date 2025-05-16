import { Pixel } from '@bad-advice-hotline/ui';

export interface PlaygroundInterface {
  pixels: Pixel[];
}

export interface RunAlgorithmResponseInterface {
  pixels: Pixel[];
  solution: Pixel[];
}

export interface PlaygroundRequestInterface {
  pixels: Pixel[];
}

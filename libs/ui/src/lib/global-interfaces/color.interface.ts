import { Pixel } from '@bad-advice-hotline/ui';

export interface Color {
  name: string;
  value: string;
  maxAmount?: number;
  type?: Pixel['type'];
}

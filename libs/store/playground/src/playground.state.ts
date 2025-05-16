import { Pixel } from '@bad-advice-hotline/ui';
import { signalStore, type, withState } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { withPlaygroundMethods } from './playground.methods';
import { withPlaygroundSelectors } from './playground.selectors';

export enum PaintingMode {
  CREATE = 'create',
  ERASE = 'erase',
}

export type PlaygroundState = {
  isLoading: boolean;
  pixels: Pixel[];
  isMouseLocked: boolean;
  paintingMode: PaintingMode;
  error?: string;
};

const initialState: PlaygroundState = {
  isLoading: false,
  pixels: [],
  isMouseLocked: false,
  paintingMode: PaintingMode.CREATE,
  error: undefined,
};

export const PlaygroundStore = signalStore(
  withEntities({ entity: type<Pixel>(), collection: 'pixels' }),
  withState(initialState),
  withPlaygroundSelectors(),
  withPlaygroundMethods(),
);

import { inject } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
// import { ToastHelper } from 'src/app/helpers/toast.helper';
import { Pixel } from '@bad-advice-hotline/ui';
import { AVAILABLE_COLORS } from 'libs/ui/src/lib/constants/colors';
import { PlaygroundInterface } from './playground.interface';
import { PlaygroundService } from './playground.service';
import { PaintingMode, PlaygroundState } from './playground.state';
const getColorForType = (
  type: NonNullable<Pixel['type']>,
): string | undefined => {
  const color = AVAILABLE_COLORS.find((c) => c.type === type);
  return color?.value;
};

const mapPixelsWithFillStyle = (pixels: Pixel[]): Pixel[] => {
  return pixels.map((pixel) => ({
    ...pixel,
    fillStyle: pixel.type ? getColorForType(pixel.type) : undefined,
  }));
};

export function withPlaygroundMethods() {
  return signalStoreFeature(
    { state: type<PlaygroundState>() },
    withMethods((state, playgroundService = inject(PlaygroundService)) => ({
      updatePixels: (pixels: Pixel[]) => {
        const updatedPixels = mapPixelsWithFillStyle(pixels);
        patchState(state, { pixels: updatedPixels });
      },

      lockMouse: () => {
        patchState(state, { isMouseLocked: true });
      },

      releaseMouse: () => {
        patchState(state, { isMouseLocked: false });
      },

      setPaintingMode: (mode: PaintingMode) => {
        patchState(state, { paintingMode: mode });
      },

      fillPixel: (pixel: Pixel) => {
        const updatedPixels = state
          .pixels()
          .map((p) =>
            p.id === pixel.id
              ? { ...p, fillStyle: pixel.fillStyle, type: pixel.type }
              : p,
          );
        patchState(state, { pixels: updatedPixels });
      },

      clearPixel: (x: number, y: number) => {
        const pixelId = `${y}-${x}`;
        const pixels = [...state.pixels()];
        const pixelIndex = pixels.findIndex((p) => p.id === pixelId);

        if (pixelIndex !== -1) {
          if (!pixels[pixelIndex].fillStyle) {
            return;
          }

          pixels[pixelIndex] = {
            ...pixels[pixelIndex],
            fillStyle: undefined,
          };
          patchState(state, { pixels });
        }
      },

      clearGrid: () => {
        const updatedPixels = state.pixels().map((p) => ({
          ...p,
          fillStyle: '',
          type: 'empty' as const,
        }));
        patchState(state, { pixels: updatedPixels });
      },

      runAlgorithm: rxMethod<PlaygroundInterface>(
        pipe(
          switchMap((params) => {
            patchState(state, { isLoading: true });
            return playgroundService.runAlgorithm(params).pipe(
              tap({
                next: (playground) => {
                  const updatedPixels = mapPixelsWithFillStyle(
                    playground.pixels,
                  );
                  patchState(state, { pixels: updatedPixels });
                },
                error: () => console.log('Failed to run algorithm'),
                finalize: () => {
                  patchState(state, { isLoading: false });
                },
              }),
            );
          }),
        ),
      ),

      generateMaze: rxMethod<PlaygroundInterface>(
        pipe(
          switchMap((params) => {
            patchState(state, { isLoading: true });
            return playgroundService.generateMaze(params).pipe(
              tap({
                next: (playground) => {
                  const updatedPixels = mapPixelsWithFillStyle(
                    playground.pixels,
                  );
                  patchState(state, { pixels: updatedPixels });
                },
                error: (error) => {
                  patchState(state, { error: 'Failed to generate maze' });
                  console.error('Error generating maze:', error);
                },
                finalize: () => {
                  patchState(state, { isLoading: false });
                },
              }),
            );
          }),
        ),
      ),
    })),
  );
}

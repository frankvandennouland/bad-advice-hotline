import { computed } from '@angular/core';
import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { PlaygroundState } from './playground.state';

export function withPlaygroundSelectors() {
  return signalStoreFeature(
    { state: type<PlaygroundState>() },
    withComputed((state) => ({
      isLoading: computed(() => state.isLoading()),
      pixels: computed(() => state.pixels()),
      isMouseLocked: computed(() => state.isMouseLocked()),
      paintingMode: computed(() => state.paintingMode()),
    })),
  );
}

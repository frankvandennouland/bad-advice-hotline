import { computed } from '@angular/core';
import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { BadAdviceHotlineState } from './badAdviceHotline.interface';

export function withBadAdviceHotlineSelectors() {
  return signalStoreFeature(
    { state: type<BadAdviceHotlineState>() },
    withComputed((state) => ({
      sortedAdvice: computed(() => {
        return [...state.advice()].sort((a, b) => b.score - a.score);
      }),

      topAdvice: computed(() => {
        return state.advice.length > 0
          ? state
              .advice()
              .reduce((prev, current) =>
                prev.score > current.score ? prev : current,
              )
          : null;
      }),

      isGameActive: computed(() => {
        if (!state.currentGame) return false;
        return (
          state.currentGame()?.status === 'active' &&
          new Date(state.currentGame()?.ends_at ?? '') > new Date()
        );
      }),
    })),
  );
}

import { computed } from '@angular/core';
import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { Advice, BadAdviceHotlineState } from './badAdviceHotline.interface';

export function withBadAdviceHotlineSelectors() {
  return signalStoreFeature(
    { state: type<BadAdviceHotlineState>() },
    withComputed((state) => ({
      sortedAdvice: computed(() => {
        const advice = state.advice();
        console.log('advice', advice);
        if (!advice || advice.length === 0) return [];

        return [...advice].sort((a, b) => b.score - a.score);
      }),

      topAdvice: computed(() => {
        const advice = state.advice();
        return advice.length > 0
          ? advice.reduce((prev: Advice, current: Advice) =>
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

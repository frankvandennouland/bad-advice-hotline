import { computed } from '@angular/core';
import { signalStore, withComputed, withState } from '@ngrx/signals';
import { BadAdviceHotlineState } from './badAdviceHotline.interface';
import { withBadAdviceHotlineMethods } from './badAdviceHotline.methods';

const initialState: BadAdviceHotlineState = {
  currentGame: null,
  advice: [],
  isLoading: false,
  error: null,
  currentUser: null,
  token: null,
};

export const BadAdviceHotlineStore = signalStore(
  withState(initialState),
  withComputed((state) => ({
    sortedAdvice: computed(() => {
      return [...state.advice()].sort((a, b) => {
        if (a.ai_score === undefined && b.ai_score === undefined) return 0;
        if (a.ai_score === undefined) return 1;
        if (b.ai_score === undefined) return -1;
        return b.ai_score - a.ai_score;
      });
    }),
    isGameActive: computed(() => {
      const game = state.currentGame();
      if (!game) return false;
      return game.status === 'active' && new Date(game.ends_at) > new Date();
    }),
  })),
  withBadAdviceHotlineMethods(),
);

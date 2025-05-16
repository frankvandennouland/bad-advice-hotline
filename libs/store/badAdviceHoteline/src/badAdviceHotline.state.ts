import { signalStore, withState } from '@ngrx/signals';
import { BadAdviceHotlineState } from './badAdviceHotline.interface';
import { withBadAdviceHotlineMethods } from './badAdviceHotline.methods';
import { withBadAdviceHotlineSelectors } from './badAdviceHotline.selectors';

const initialStateBadAdviceHotline: BadAdviceHotlineState = {
  currentGame: null,
  advice: [],
  isLoading: false,
  error: null,
};

export const BadAdviceHotlineStore = signalStore(
  withState(initialStateBadAdviceHotline),
  withBadAdviceHotlineSelectors(),
  withBadAdviceHotlineMethods(),
);

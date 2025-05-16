import { signalStore, type, withState } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { Advice, BadAdviceHotlineState } from './badAdviceHotline.interface';
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
  withEntities({ entity: type<Advice>(), collection: 'advice' }),
  withBadAdviceHotlineSelectors(),
  withBadAdviceHotlineMethods(),
);

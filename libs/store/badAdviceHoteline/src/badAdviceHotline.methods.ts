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
import {
  Advice,
  BadAdviceHotlineState,
  CreateGameRequest,
  SubmitAdviceRequest,
} from './badAdviceHotline.interface';
import { BadAdviceHotlineService } from './badAdviceHotline.service';

export function withBadAdviceHotlineMethods() {
  return signalStoreFeature(
    { state: type<BadAdviceHotlineState>() },
    withMethods((state) => {
      const service = inject(BadAdviceHotlineService);

      return {
        createGame: rxMethod<CreateGameRequest>(
          pipe(
            switchMap((request) => {
              patchState(state, { isLoading: true, error: null });
              return service.createGame(request.question).pipe(
                tap({
                  next: (game) => {
                    patchState(state, { currentGame: game });
                  },
                  error: (error) => {
                    patchState(state, {
                      error:
                        error instanceof Error
                          ? error.message
                          : 'Failed to create game',
                    });
                  },
                  finalize: () => {
                    patchState(state, { isLoading: false });
                  },
                }),
              );
            }),
          ),
        ),

        submitAdvice: rxMethod<SubmitAdviceRequest>(
          pipe(
            switchMap((request) => {
              patchState(state, { isLoading: true, error: null });
              return service
                .submitAdvice(request.game_id, request.user_id, request.content)
                .pipe(
                  tap({
                    next: (advice) => {
                      patchState(state, (state) => ({
                        advice: [...state.advice, advice],
                      }));
                    },
                    error: (error) => {
                      patchState(state, {
                        error:
                          error instanceof Error
                            ? error.message
                            : 'Failed to submit advice',
                      });
                    },
                    finalize: () => {
                      patchState(state, { isLoading: false });
                    },
                  }),
                );
            }),
          ),
        ),

        loadGame: rxMethod<string>(
          pipe(
            switchMap((gameId) => {
              patchState(state, { isLoading: true, error: null });
              return service.getGame(gameId).pipe(
                tap({
                  next: ({ game, advice }) => {
                    patchState(state, { currentGame: game, advice });
                  },
                  error: (error) => {
                    patchState(state, {
                      error:
                        error instanceof Error
                          ? error.message
                          : 'Failed to load game',
                    });
                  },
                  finalize: () => {
                    patchState(state, { isLoading: false });
                  },
                }),
              );
            }),
          ),
        ),

        scoreAdvice: rxMethod<{ gameId: string; adviceId: string }>(
          pipe(
            switchMap(({ gameId, adviceId }) => {
              patchState(state, { isLoading: true, error: null });
              return service.scoreAdvice(gameId, adviceId).pipe(
                tap({
                  next: (scoredAdvice) => {
                    patchState(state, (state) => {
                      const updatedAdvice = state.advice.map((a: Advice) =>
                        a.id === adviceId ? scoredAdvice : a,
                      );
                      return { advice: updatedAdvice };
                    });
                  },
                  error: (error) => {
                    patchState(state, {
                      error:
                        error instanceof Error
                          ? error.message
                          : 'Failed to score advice',
                    });
                  },
                  finalize: () => {
                    patchState(state, { isLoading: false });
                  },
                }),
              );
            }),
          ),
        ),
      };
    }),
  );
}

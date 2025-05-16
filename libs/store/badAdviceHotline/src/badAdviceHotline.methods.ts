import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  signalStoreFeature,
  type,
  withComputed,
  withMethods,
  withState,
  WritableStateSource,
} from '@ngrx/signals';
import { catchError, finalize, Observable, tap } from 'rxjs';
import {
  Advice,
  BadAdviceHotlineState,
  CreateGameRequest,
  CreateUserRequest,
  LoginRequest,
  SubmitAdviceRequest,
} from './badAdviceHotline.interface';
import { BadAdviceHotlineService } from './badAdviceHotline.service';

const initialState: BadAdviceHotlineState = {
  currentGame: null,
  advice: [],
  isLoading: false,
  error: null,
  currentUser: null,
  token: null,
};

type StoreWithState = WritableStateSource<BadAdviceHotlineState> & {
  currentGame: () => BadAdviceHotlineState['currentGame'];
  advice: () => BadAdviceHotlineState['advice'];
  isLoading: () => BadAdviceHotlineState['isLoading'];
  error: () => BadAdviceHotlineState['error'];
  currentUser: () => BadAdviceHotlineState['currentUser'];
  token: () => BadAdviceHotlineState['token'];
};

export function withBadAdviceHotlineMethods() {
  return signalStoreFeature(
    { state: type<BadAdviceHotlineState>() },
    withMethods(
      (state, badAdviceHotlineService = inject(BadAdviceHotlineService)) => ({
        createUser: createUser(state, badAdviceHotlineService),
        login: login(state, badAdviceHotlineService),
        logout: logout(state),
        createGame: createGame(state, badAdviceHotlineService),
        submitAdvice: submitAdvice(state, badAdviceHotlineService),
        loadGame: loadGame(state, badAdviceHotlineService),
        scoreAdvice: scoreAdvice(state, badAdviceHotlineService),
      }),
    ),
  );
}

export const createUser =
  (store: StoreWithState, service: BadAdviceHotlineService) =>
  (request: CreateUserRequest) => {
    patchState(store, { isLoading: true, error: null });
    return service.createUser(request).pipe(
      tap((response) => {
        patchState(store, {
          currentUser: response.user,
          token: response.token,
        });
        localStorage.setItem('token', response.token);
      }),
      catchError((error) => {
        patchState(store, {
          error:
            error instanceof Error ? error.message : 'Failed to create user',
        });
        throw error;
      }),
      finalize(() => {
        patchState(store, { isLoading: false });
      }),
    );
  };

export const login =
  (store: StoreWithState, service: BadAdviceHotlineService) =>
  (request: LoginRequest) => {
    patchState(store, { isLoading: true, error: null });
    return service.login(request).pipe(
      tap((response) => {
        patchState(store, {
          currentUser: response.user,
          token: response.token,
        });
        localStorage.setItem('token', response.token);
      }),
      catchError((error) => {
        patchState(store, {
          error: error instanceof Error ? error.message : 'Failed to login',
        });
        throw error;
      }),
      finalize(() => {
        patchState(store, { isLoading: false });
      }),
    );
  };

export const logout = (store: StoreWithState) => () => {
  localStorage.removeItem('token');
  patchState(store, {
    currentUser: null,
    token: null,
  });
};

export const createGame =
  (store: StoreWithState, service: BadAdviceHotlineService) =>
  (request: CreateGameRequest) => {
    patchState(store, { isLoading: true, error: null });
    return service.createGame(request.question).pipe(
      tap((game) => {
        patchState(store, {
          currentGame: game,
          advice: [],
        });
      }),
      catchError((error) => {
        patchState(store, {
          error:
            error instanceof Error ? error.message : 'Failed to create game',
        });
        throw error;
      }),
      finalize(() => {
        patchState(store, { isLoading: false });
      }),
    );
  };

export const submitAdvice =
  (store: StoreWithState, service: BadAdviceHotlineService) =>
  (request: SubmitAdviceRequest): Observable<Advice> | undefined => {
    if (!store.currentGame()) {
      patchState(store, {
        error: 'No active game found',
      });
      return undefined;
    }

    patchState(store, { isLoading: true, error: null });
    return service
      .submitAdvice(request.game_id, request.user_id, request.content)
      .pipe(
        tap((advice) => {
          if (store.advice()) {
            patchState(store, {
              advice: [...store.advice(), advice],
            });
          } else {
            patchState(store, {
              advice: [advice],
            });
          }
        }),
        catchError((error) => {
          patchState(store, {
            error:
              error instanceof Error
                ? error.message
                : 'Failed to submit advice',
          });
          throw error;
        }),
        finalize(() => {
          patchState(store, { isLoading: false });
        }),
      );
  };

export const loadGame =
  (store: StoreWithState, service: BadAdviceHotlineService) =>
  (gameId: string) => {
    patchState(store, { isLoading: true, error: null });
    return service.getGame(gameId).pipe(
      tap((game) => {
        patchState(store, {
          currentGame: game,
          advice: game.advice,
        });
      }),
      catchError((error) => {
        patchState(store, {
          error: error instanceof Error ? error.message : 'Failed to load game',
        });
        throw error;
      }),
      finalize(() => {
        patchState(store, { isLoading: false });
      }),
    );
  };

export const scoreAdvice =
  (store: StoreWithState, service: BadAdviceHotlineService) =>
  (gameId: string, adviceId: string) => {
    patchState(store, { isLoading: true, error: null });
    return service.scoreAdvice(gameId, adviceId).pipe(
      tap((scoredAdvice) => {
        patchState(store, {
          advice: store.advice().map((a: Advice) =>
            a.id === adviceId
              ? {
                  ...a,
                  ai_score: scoredAdvice.score,
                  ai_feedback: scoredAdvice.feedback,
                }
              : a,
          ),
        });
      }),
      catchError((error) => {
        patchState(store, {
          error:
            error instanceof Error ? error.message : 'Failed to score advice',
        });
        throw error;
      }),
      finalize(() => {
        patchState(store, { isLoading: false });
      }),
    );
  };

export const BadAdviceHotlineStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    sortedAdvice: computed(() => {
      if (!state.advice()) return [];

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
  withMethods((store, service = inject(BadAdviceHotlineService)) => ({
    createUser: createUser(store, service),
    login: login(store, service),
    logout: logout(store),
    createGame: createGame(store, service),
    submitAdvice: submitAdvice(store, service),
    loadGame: loadGame(store, service),
    scoreAdvice: scoreAdvice(store, service),
  })),
);

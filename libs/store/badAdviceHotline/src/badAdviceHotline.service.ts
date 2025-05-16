import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BAD_ADVICE_HOTLINE_SERVICE_URL } from './api.tokens';
import {
  Advice,
  AiScoreResponse,
  CreateUserRequest,
  CreateUserResponse,
  Game,
  LoginRequest,
  LoginResponse,
  User,
} from './badAdviceHotline.interface';

interface GetGameResponse {
  game: Game;
  advice: Advice[];
}

@Injectable({
  providedIn: 'root',
})
export class BadAdviceHotlineService {
  constructor(
    private readonly http: HttpClient,
    @Inject(BAD_ADVICE_HOTLINE_SERVICE_URL)
    private readonly badAdviceHotlineServiceUrl: string,
  ) {}

  createUser(request: CreateUserRequest): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(
      `${this.badAdviceHotlineServiceUrl}/users`,
      request,
    );
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.badAdviceHotlineServiceUrl}/login`,
      request,
    );
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.badAdviceHotlineServiceUrl}/users/me`);
  }

  createGame(question: string): Observable<Game> {
    return this.http.post<Game>(`${this.badAdviceHotlineServiceUrl}/games`, {
      question,
    });
  }

  submitAdvice(
    gameId: string,
    userId: string,
    content: string,
  ): Observable<Advice> {
    return this.http.post<Advice>(
      `${this.badAdviceHotlineServiceUrl}/games/${gameId}/advice`,
      {
        user_id: userId,
        content,
      },
    );
  }

  getGame(gameId: string): Observable<Game> {
    return this.http
      .get<GetGameResponse>(
        `${this.badAdviceHotlineServiceUrl}/games/${gameId}`,
      )
      .pipe(
        map((response) => ({
          ...response.game,
          advice: response.advice,
        })),
      );
  }

  scoreAdvice(gameId: string, adviceId: string): Observable<AiScoreResponse> {
    return this.http.post<AiScoreResponse>(
      `${this.badAdviceHotlineServiceUrl}/games/${gameId}/advice/${adviceId}/score`,
      {},
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BAD_ADVICE_HOTLINE_SERVICE_URL } from './api.tokens';
import { Advice, Game } from './badAdviceHotline.interface';

@Injectable({
  providedIn: 'root',
})
export class BadAdviceHotlineService {
  constructor(
    private readonly http: HttpClient,
    @Inject(BAD_ADVICE_HOTLINE_SERVICE_URL)
    private readonly badAdviceHotlineServiceUrl: string,
  ) {}

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

  getGame(gameId: string): Observable<{ game: Game; advice: Advice[] }> {
    return this.http.get<{ game: Game; advice: Advice[] }>(
      `${this.badAdviceHotlineServiceUrl}/games/${gameId}`,
    );
  }

  scoreAdvice(gameId: string, adviceId: string): Observable<Advice> {
    return this.http.post<Advice>(
      `${this.badAdviceHotlineServiceUrl}/games/${gameId}/advice/${adviceId}/score`,
      {},
    );
  }
}

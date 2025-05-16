import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PLAYGROUND_SERVICE_URL } from './api.tokens';
import { PlaygroundInterface } from './playground.interface';

@Injectable({
  providedIn: 'root',
})
export class PlaygroundService {
  constructor(
    private readonly http: HttpClient,
    @Inject(PLAYGROUND_SERVICE_URL)
    private readonly playgroundServiceUrl: string,
  ) {}

  runAlgorithm(params: PlaygroundInterface): Observable<PlaygroundInterface> {
    return this.http.post<PlaygroundInterface>(
      `${this.playgroundServiceUrl}/algorithm/run`,
      params,
    );
  }

  generateMaze(params: PlaygroundInterface): Observable<PlaygroundInterface> {
    return this.http.post<PlaygroundInterface>(
      `${this.playgroundServiceUrl}/maze/generate`,
      params,
    );
  }
}

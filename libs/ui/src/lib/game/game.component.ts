import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BadAdviceHotlineStore } from '@bad-advice-hotline/store';

@Component({
  selector: 'bad-advice-hotline-game',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container mx-auto p-4">
      <div *ngIf="store.currentGame()">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-bold">
            {{ store.currentGame()?.question }}
          </h1>
          <a routerLink="/" class="text-blue-500 hover:text-blue-600"
            >Back to Home</a
          >
        </div>

        <div
          *ngIf="!store.isGameActive()"
          class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"
        >
          <p>
            This game has ended. You can still view the advice but cannot submit
            new advice or score existing advice.
          </p>
        </div>

        <div class="mb-8" *ngIf="store.isGameActive()">
          <h2 class="text-xl font-semibold mb-2">Submit Your Bad Advice</h2>
          <form (ngSubmit)="submitAdvice()" class="space-y-4">
            <div>
              <label
                for="advice"
                class="block text-sm font-medium text-gray-700"
                >Your Advice</label
              >
              <textarea
                id="advice"
                name="advice"
                rows="4"
                [(ngModel)]="adviceText"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your terrible advice here..."
              ></textarea>
            </div>
            <button
              type="submit"
              [disabled]="!adviceText.trim() || store.isLoading()"
              class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {{ store.isLoading() ? 'Submitting...' : 'Submit Advice' }}
            </button>
          </form>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">Submitted Advice</h2>
          <div class="space-y-4">
            <div
              *ngFor="let advice of store.sortedAdvice()"
              class="bg-white shadow rounded-lg p-4"
            >
              <p class="text-gray-800">{{ advice.content }}</p>
              <div class="mt-2 flex justify-between items-center">
                <span class="text-sm text-gray-500"
                  >Score: {{ advice.score }}</span
                >
                <button
                  *ngIf="store.isGameActive()"
                  (click)="scoreAdvice(advice.id)"
                  [disabled]="store.isLoading()"
                  class="text-sm text-indigo-600 hover:text-indigo-900 disabled:opacity-50"
                >
                  {{ store.isLoading() ? 'Scoring...' : 'Score' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class GameComponent implements OnInit {
  private route = inject(ActivatedRoute);
  store = inject(BadAdviceHotlineStore);
  adviceText = '';

  ngOnInit() {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.store.loadGame(gameId);
    }
  }

  submitAdvice() {
    if (this.adviceText.trim() && this.store.currentGame()) {
      this.store.submitAdvice({
        game_id: this.store.currentGame()!.id,
        user_id: 'user-1', // TODO: Get from auth service
        content: this.adviceText,
      });
      this.adviceText = '';
    }
  }

  scoreAdvice(adviceId: string) {
    if (this.store.currentGame()) {
      this.store.scoreAdvice({
        gameId: this.store.currentGame()!.id,
        adviceId,
      });
    }
  }
}

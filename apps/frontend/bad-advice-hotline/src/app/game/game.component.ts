import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  BadAdviceHotlineStore,
  SubmitAdviceRequest,
} from '@bad-advice-hotline/store';

@Component({
  selector: 'bad-advice-hotline-game',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container mx-auto p-4">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow p-6 mb-8">
          <h1 class="text-2xl font-bold mb-4">
            {{ store.currentGame()?.question }}
          </h1>
          <div class="text-sm text-gray-600">
            <p>Status: {{ store.currentGame()?.status }}</p>
            <p>Created: {{ store.currentGame()?.created_at | date }}</p>
            <p>Ends: {{ store.currentGame()?.ends_at | date }}</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6 mb-8">
          <h2 class="text-xl font-bold mb-4">Submit Advice</h2>
          <form (ngSubmit)="onSubmitAdvice()" #adviceForm="ngForm">
            <div class="mb-4">
              <textarea
                [(ngModel)]="adviceContent"
                name="content"
                rows="4"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your bad advice here..."
              ></textarea>
            </div>
            <div *ngIf="store.error()" class="text-red-500 text-sm mb-4">
              {{ store.error() }}
            </div>
            <button
              type="submit"
              [disabled]="!adviceForm.form.valid || store.isLoading()"
              class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {{ store.isLoading() ? 'Submitting...' : 'Submit Advice' }}
            </button>
          </form>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Advice List</h2>
          <div class="space-y-4">
            <div
              *ngFor="let advice of store.sortedAdvice()"
              class="border rounded-lg p-4"
            >
              <p class="mb-2">{{ advice.content }}</p>
              <div class="text-sm text-gray-600">
                <p>Submitted: {{ advice.created_at | date }}</p>
                <div *ngIf="advice.ai_score !== undefined">
                  <p>AI Score: {{ advice.ai_score }}/10</p>
                  <p>AI Feedback: {{ advice.ai_feedback }}</p>
                </div>
                <button
                  *ngIf="advice.ai_score === undefined"
                  (click)="onScoreAdvice(advice.id)"
                  [disabled]="store.isLoading()"
                  class="text-indigo-600 hover:text-indigo-500"
                >
                  Score Advice
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
  protected store = inject(BadAdviceHotlineStore);
  private route = inject(ActivatedRoute);
  adviceContent = '';

  ngOnInit() {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId && gameId !== 'new') {
      this.store.loadGame(gameId).subscribe({
        error: (error) => {
          console.error('Failed to load game:', error);
        },
      });
    }
  }

  onSubmitAdvice() {
    const currentGame = this.store.currentGame();
    const currentUser = this.store.currentUser();

    console.log('currentGame', currentGame);
    console.log('currentUser', currentUser);
    console.log('adviceContent', this.adviceContent);

    if (!this.adviceContent || !currentGame || !currentUser) {
      return;
    }

    const submitAdviceRequest: SubmitAdviceRequest = {
      content: this.adviceContent,
      game_id: currentGame.id,
      user_id: currentUser.id,
    };

    const result = this.store.submitAdvice(submitAdviceRequest);
    if (result) {
      result.subscribe({
        next: () => {
          this.adviceContent = '';
        },
        error: (error) => {
          console.error('Failed to submit advice:', error);
        },
      });
    }
  }

  onScoreAdvice(adviceId: string) {
    const currentGame = this.store.currentGame();
    if (!currentGame) {
      return;
    }

    this.store.scoreAdvice(currentGame.id, adviceId).subscribe({
      error: (error) => {
        console.error('Failed to score advice:', error);
      },
    });
  }
}

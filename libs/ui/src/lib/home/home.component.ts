import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BadAdviceHotlineStore } from '@bad-advice-hotline/store';

@Component({
  selector: 'bad-advice-hotline-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Start a New Game</h2>
      <form (ngSubmit)="onCreateGame()" #gameForm="ngForm">
        <div class="mb-4">
          <label for="question" class="block text-gray-700 mb-2"
            >Enter a question for bad advice:</label
          >
          <textarea
            [(ngModel)]="question"
            name="question"
            id="question"
            class="w-full p-2 border rounded"
            rows="4"
            placeholder="e.g., How do I get my cat to stop scratching the furniture?"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          [disabled]="!gameForm.form.valid || store.isLoading()"
          class="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
        >
          {{ store.isLoading() ? 'Creating...' : 'Create Game' }}
        </button>
      </form>
    </div>

    <div class="mt-8 text-center">
      <a routerLink="/join" class="text-blue-500 hover:text-blue-600"
        >Or join an existing game</a
      >
    </div>

    <div class="mt-8 text-center text-gray-600">
      <p>How it works:</p>
      <ol class="list-decimal list-inside mt-2 text-left">
        <li>Create a game with a question</li>
        <li>Share the game link with friends</li>
        <li>Everyone submits their worst advice</li>
        <li>AI scores the advice based on how bad it is</li>
        <li>Winner gets bragging rights!</li>
      </ol>
    </div>
  `,
})
export class HomeComponent {
  protected store = inject(BadAdviceHotlineStore);
  private router = inject(Router);
  question = '';

  constructor() {
    effect(() => {
      const game = this.store.currentGame();
      if (game) {
        this.router.navigate(['/game', game.id]);
      }
    });
  }

  onCreateGame() {
    if (this.question.trim()) {
      this.store.createGame({ question: this.question.trim() }).subscribe({
        next: () => {
          this.question = '';
        },
        error: (error) => {
          console.error('Failed to create game:', error);
        },
      });
    }
  }
}

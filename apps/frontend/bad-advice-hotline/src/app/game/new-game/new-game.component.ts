import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BadAdviceHotlineStore } from '@bad-advice-hotline/store';

@Component({
  selector: 'bad-advice-hotline-new-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold mb-8 text-center">Create New Game</h1>

        <div class="bg-white rounded-lg shadow p-6">
          <form
            (ngSubmit)="onCreateGame()"
            #gameForm="ngForm"
            class="space-y-4"
          >
            <div>
              <label
                for="question"
                class="block text-sm font-medium text-gray-700"
                >Question</label
              >
              <textarea
                id="question"
                name="question"
                [(ngModel)]="question"
                required
                rows="4"
                #questionInput="ngModel"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., How do I get my cat to stop scratching the furniture?"
              ></textarea>
              <div
                *ngIf="
                  questionInput.invalid &&
                  (questionInput.dirty || questionInput.touched)
                "
                class="text-red-500 text-sm mt-1"
              >
                Please enter a question
              </div>
            </div>

            <div *ngIf="store.error()" class="text-red-500 text-sm">
              {{ store.error() }}
            </div>

            <button
              type="submit"
              [disabled]="!gameForm.form.valid || store.isLoading()"
              class="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {{ store.isLoading() ? 'Creating...' : 'Create Game' }}
            </button>
          </form>
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
      </div>
    </div>
  `,
})
export class NewGameComponent {
  protected store = inject(BadAdviceHotlineStore);
  private router = inject(Router);
  question = '';

  onCreateGame() {
    if (this.question.trim()) {
      this.store.createGame({ question: this.question.trim() }).subscribe({
        next: (game) => {
          this.router.navigate(['/game', game.id]);
        },
        error: (error) => {
          console.error('Failed to create game:', error);
        },
      });
    }
  }
}

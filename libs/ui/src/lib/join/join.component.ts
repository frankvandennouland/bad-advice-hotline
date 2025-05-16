import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BadAdviceHotlineStore } from '@bad-advice-hotline/store';

@Component({
  selector: 'bad-advice-hotline-join',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container mx-auto p-4">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold mb-8 text-center">Join a Game</h1>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Enter Game Code</h2>
          <form (ngSubmit)="onJoinGame()" #joinForm="ngForm">
            <div class="mb-4">
              <label for="gameCode" class="block text-gray-700 mb-2"
                >Game Code:</label
              >
              <input
                [(ngModel)]="gameCode"
                name="gameCode"
                id="gameCode"
                class="w-full p-2 border rounded"
                placeholder="Enter the game code"
                required
                pattern="[A-Za-z0-9]+"
                #gameCodeInput="ngModel"
              />
              <div
                *ngIf="
                  gameCodeInput.invalid &&
                  (gameCodeInput.dirty || gameCodeInput.touched)
                "
                class="text-red-500 text-sm mt-1"
              >
                Please enter a valid game code
              </div>
            </div>
            <button
              type="submit"
              [disabled]="!joinForm.form.valid || store.isLoading()"
              class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {{ store.isLoading() ? 'Joining...' : 'Join Game' }}
            </button>
          </form>
        </div>

        <div class="mt-8 text-center">
          <a routerLink="/" class="text-blue-500 hover:text-blue-600"
            >Or create a new game</a
          >
        </div>
      </div>
    </div>
  `,
})
export class JoinComponent {
  protected store = inject(BadAdviceHotlineStore);
  private router = inject(Router);
  gameCode = '';

  async onJoinGame() {
    if (this.gameCode.trim()) {
      this.store.loadGame(this.gameCode.trim());
      if (this.store.currentGame()) {
        this.router.navigate(['/game', this.store.currentGame()!.id]);
      }
      this.gameCode = '';
    }
  }
}

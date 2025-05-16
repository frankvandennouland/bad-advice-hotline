import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadAdviceHotlineStore } from '@bad-advice-hotline/store';

@Component({
  selector: 'bad-advice-hotline-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto p-4">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow p-6 mb-8">
          <div class="flex items-center space-x-4">
            <img
              [src]="
                store.currentUser()?.avatar_url || 'assets/default-avatar.png'
              "
              alt="Profile"
              class="w-20 h-20 rounded-full"
            />
            <div>
              <h1 class="text-2xl font-bold">
                {{ store.currentUser()?.username }}
              </h1>
              <p class="text-gray-600">{{ store.currentUser()?.email }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Game History</h2>
          <div class="space-y-4">
            <div
              *ngFor="let game of store.currentUser()?.games"
              class="border rounded-lg p-4"
            >
              <h3 class="font-semibold">{{ game.question }}</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-600">
                  Created: {{ game.created_at | date }}
                </p>
                <p class="text-sm text-gray-600">
                  Status:
                  <span
                    [class]="
                      game.status === 'active'
                        ? 'text-green-600'
                        : 'text-gray-600'
                    "
                    >{{ game.status }}</span
                  >
                </p>
              </div>
              <div class="mt-4">
                <a
                  [routerLink]="['/game', game.id]"
                  class="text-indigo-600 hover:text-indigo-500"
                  >View Game</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProfileComponent {
  protected store = inject(BadAdviceHotlineStore);
}

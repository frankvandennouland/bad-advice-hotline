import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BadAdviceHotlineStore } from '@bad-advice-hotline/store';

@Component({
  selector: 'bad-advice-hotline-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container mx-auto p-4">
      <div class="max-w-md mx-auto">
        <h1 class="text-3xl font-bold mb-8 text-center">Sign Up</h1>

        <div class="bg-white rounded-lg shadow p-6">
          <form (ngSubmit)="onSignup()" #signupForm="ngForm" class="space-y-4">
            <div>
              <label
                for="username"
                class="block text-sm font-medium text-gray-700"
                >Username</label
              >
              <input
                type="text"
                id="username"
                name="username"
                [(ngModel)]="username"
                required
                minlength="3"
                #usernameInput="ngModel"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <div
                *ngIf="
                  usernameInput.invalid &&
                  (usernameInput.dirty || usernameInput.touched)
                "
                class="text-red-500 text-sm mt-1"
              >
                Username must be at least 3 characters
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700"
                >Email</label
              >
              <input
                type="email"
                id="email"
                name="email"
                [(ngModel)]="email"
                required
                email
                #emailInput="ngModel"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <div
                *ngIf="
                  emailInput.invalid && (emailInput.dirty || emailInput.touched)
                "
                class="text-red-500 text-sm mt-1"
              >
                Please enter a valid email address
              </div>
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
                >Password</label
              >
              <input
                type="password"
                id="password"
                name="password"
                [(ngModel)]="password"
                required
                minlength="6"
                #passwordInput="ngModel"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <div
                *ngIf="
                  passwordInput.invalid &&
                  (passwordInput.dirty || passwordInput.touched)
                "
                class="text-red-500 text-sm mt-1"
              >
                Password must be at least 6 characters
              </div>
            </div>

            <div *ngIf="store.error()" class="text-red-500 text-sm">
              {{ store.error() }}
            </div>

            <button
              type="submit"
              [disabled]="!signupForm.form.valid || store.isLoading()"
              class="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {{ store.isLoading() ? 'Creating account...' : 'Sign Up' }}
            </button>
          </form>
        </div>

        <div class="mt-8 text-center">
          <a routerLink="/login" class="text-indigo-600 hover:text-indigo-500"
            >Already have an account? Login</a
          >
        </div>
      </div>
    </div>
  `,
})
export class SignupComponent {
  protected store = inject(BadAdviceHotlineStore);
  private router = inject(Router);
  username = '';
  email = '';
  password = '';

  onSignup() {
    if (this.username && this.email && this.password) {
      this.store
        .createUser({
          username: this.username,
          email: this.email,
          password: this.password,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Signup failed:', error);
          },
        });
    }
  }
}

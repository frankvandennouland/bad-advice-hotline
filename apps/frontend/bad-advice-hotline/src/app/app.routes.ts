import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BadAdviceHotlineStore } from '@bad-advice-hotline/store';
import {
  JoinComponent,
  LoginComponent,
  ProfileComponent,
  SignupComponent,
} from '@bad-advice-hotline/ui';

const authGuard = () => {
  const store = inject(BadAdviceHotlineStore);
  return store.currentUser() !== null;
};

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'game/new',
    loadComponent: () =>
      import('./game/new-game/new-game.component').then(
        (m) => m.NewGameComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'game/:id',
    loadComponent: () =>
      import('./game/game.component').then((m) => m.GameComponent),
    canActivate: [authGuard],
  },
  {
    path: 'join',
    component: JoinComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: '/game/new',
    pathMatch: 'full',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes)],
})
export class AppRoutingModule {}

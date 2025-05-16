import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  GameComponent,
  HomeComponent,
  JoinComponent,
} from '@bad-advice-hotline/ui';

export const appRoutes: Routes = [
  {
    path: 'game/:id',
    component: GameComponent,
  },
  {
    path: 'join',
    component: JoinComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes)],
})
export class AppRoutingModule {}

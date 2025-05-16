import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { JoinComponent } from './join/join.component';
import { PlayersComponent } from './players/players.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GameComponent,
    HomeComponent,
    JoinComponent,
    PlayersComponent,
  ],
  exports: [GameComponent, HomeComponent, JoinComponent, PlayersComponent],
})
export class UiModule {}

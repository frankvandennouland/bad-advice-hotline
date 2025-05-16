import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Player {
  id: string;
  name: string;
  isHost: boolean;
  score: number;
}

@Component({
  selector: 'bad-advice-hotline-players',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-lg font-semibold mb-4">Players</h3>
      <div class="space-y-2">
        <div
          *ngFor="let player of players"
          class="flex items-center justify-between p-2 rounded"
          [class.bg-gray-50]="player.isHost"
        >
          <div class="flex items-center">
            <span class="font-medium">{{ player.name }}</span>
            <span
              *ngIf="player.isHost"
              class="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded"
            >
              Host
            </span>
          </div>
          <span class="text-gray-600">{{ player.score }} pts</span>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class PlayersComponent {
  @Input() players: Player[] = [];
}

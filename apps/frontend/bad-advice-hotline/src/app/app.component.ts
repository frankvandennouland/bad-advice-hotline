import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { PlaygroundStore } from '@bad-advice-hotline/store/playground';
import { AVAILABLE_COLORS } from 'libs/ui/src/lib/constants/colors';
import { PlaygroundComponent } from 'libs/ui/src/lib/playground/playground.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'bad-advice-hotline-root',
  standalone: false,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  @ViewChild(PlaygroundComponent) playground!: PlaygroundComponent;

  private store = inject(PlaygroundStore);
  private destroy$ = new Subject<void>();

  title = 'bad-advice-hotline';
  pixelSize = 40;
  algorithms: string[] = ['A*', 'Dijkstra', 'Breadth-First Search'];
  colors = AVAILABLE_COLORS;

  // Access store signals
  storeState = this.store;
  error = undefined;

  runAlgorithm() {
    this.store.runAlgorithm({
      pixels: this.store.pixels(),
    });
  }

  generateMaze() {
    this.store.generateMaze({
      pixels: this.store.pixels(),
    });
  }

  resetGrid() {
    this.store.clearGrid();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

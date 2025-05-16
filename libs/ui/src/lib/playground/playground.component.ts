import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  PaintingMode,
  PlaygroundStore,
} from '@bad-advice-hotline/store/playground';
import { Pixel } from '@bad-advice-hotline/ui';
import { Subject } from 'rxjs';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { DrawingGridComponent } from '../drawing-grid/drawing-grid.component';
import { Color } from '../global-interfaces/color.interface';

@Component({
  selector: 'ui-playground',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerComponent,
    DrawingGridComponent,
  ],
  templateUrl: './playground.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlaygroundComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  private readonly store = inject(PlaygroundStore);

  @Input() colors: Color[] = [];
  @Input() width: number | undefined;
  @Input() height: number | undefined;
  @Input() pixelSize = 28;
  @Output() pixels: EventEmitter<Pixel[]> = new EventEmitter();

  private color?: Color;

  constructor() {}

  ngOnInit() {
    if (!this.width) {
      this.width = document.documentElement.clientWidth - 120;
    }

    if (!this.height) {
      this.height = document.documentElement.clientHeight - 200;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // on click
  onMouseDown(pixel: Pixel) {
    this.fillPixel(pixel);
  }

  // press and hold
  onMouseMove(pixel: Pixel) {
    this.fillPixel(pixel);
  }

  // right click
  onContextMenu(pixel: Pixel) {
    this.updateMaxAmountValues(pixel.x, pixel.y);
    this.store.clearPixel(pixel.x, pixel.y);
  }

  private fillPixel(pixel: Pixel) {
    if (this.store.paintingMode() === PaintingMode.ERASE) {
      this.updateMaxAmountValues(pixel.x, pixel.y);
      this.store.clearPixel(pixel.x, pixel.y);
      return;
    }

    if (this.color && this.isAllowed(this.color)) {
      this.updateMaxAmountValues(pixel.x, pixel.y);
      const NewPixel = {
        ...pixel,
        fillStyle: this.color.value,
        type: this.color.type as Pixel['type'],
      };
      this.store.fillPixel(NewPixel);
    }
  }

  private updateMaxAmountValues(x: number, y: number) {
    const pixels = this.store.pixels();
    const pixel = pixels.find((p) => p.x === x && p.y === y);

    if (pixel) {
      this.colors.forEach((item) => {
        if (item.maxAmount === undefined) {
          return;
        }

        if (pixel.fillStyle === item.value) {
          item.maxAmount++;
        }
      });
    }
  }

  private isAllowed(color: Color): boolean {
    if (color.maxAmount !== undefined) {
      if (color.maxAmount <= 0) {
        return false;
      } else {
        color.maxAmount--;
      }
    }

    return true;
  }

  selectColor(value: Color) {
    this.color = value;
  }
}

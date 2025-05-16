import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  PaintingMode,
  PlaygroundStore,
} from '@bad-advice-hotline/store/playground';
import { Pixel } from '@bad-advice-hotline/ui';
import { Subject } from 'rxjs';

@Component({
  selector: 'ui-drawing-grid',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './drawing-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DrawingGridComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  private readonly store = inject(PlaygroundStore);

  @Input() width?: number;
  @Input() height?: number;
  @Input() xNodes!: number;
  @Input() yNodes!: number;
  @Input() pixelSize!: number;
  @Input() fillStyle = '#424242';
  @Input() disabled = false;

  @Output() mouseDown: EventEmitter<Pixel> = new EventEmitter<Pixel>();
  @Output() mouseMove: EventEmitter<Pixel> = new EventEmitter<Pixel>();
  @Output() mouseUp: EventEmitter<Pixel> = new EventEmitter<Pixel>();
  @Output() contextMenu: EventEmitter<Pixel> = new EventEmitter<Pixel>();

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  renderingContext: CanvasRenderingContext2D | null | undefined;

  private paddingX!: number;
  private paddingY!: number;
  paddingLeft!: number;
  private paddingTop!: number;
  private paddingRight!: number;
  private paddingBottom!: number;

  private isMouseLocked = false;
  private cachedPixel!: Pixel;

  constructor() {
    effect(() => {
      this.isMouseLocked = this.store.isMouseLocked();
    });

    effect(() => {
      const pixels = this.store.pixels();
      if (pixels && this.renderingContext) {
        this.render(pixels);
      }
    });
  }

  ngOnInit() {
    this.calculateGridSizes();
    this.store.updatePixels(this.generatePixels());
  }

  ngAfterViewInit() {
    this.renderingContext = this.canvasRef.nativeElement.getContext('2d');

    this.clearCanvas();
    this.renderGrid();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onMouseDown(event: MouseEvent) {
    if (!this.disabled) {
      const pixel = this.getPixelAt(event.offsetX, event.offsetY);
      if (pixel) {
        this.mouseDown.emit(pixel);
      }
    }
  }

  onMouseMove(event: MouseEvent) {
    if (!this.disabled && this.isMouseLocked) {
      const pixel = this.getPixelAt(event.offsetX, event.offsetY);
      if (pixel) {
        if (
          this.cachedPixel &&
          this.cachedPixel.x === pixel.x &&
          this.cachedPixel.y === pixel.y
        ) {
          return;
        }

        this.cachedPixel = pixel;
        this.mouseMove.emit(pixel);
      }
    }
  }

  onMouseUp(event: MouseEvent) {
    if (!this.disabled && this.isMouseLocked) {
      this.store.setPaintingMode(PaintingMode.CREATE);

      const pixel = this.getPixelAt(event.offsetX, event.offsetY);
      if (pixel) {
        this.mouseUp.emit(pixel);
      }
    }
  }

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    if (!this.disabled) {
      this.store.setPaintingMode(PaintingMode.ERASE);

      const pixel = this.getPixelAt(event.offsetX, event.offsetY);
      if (pixel) {
        this.contextMenu.emit(pixel);
      }
    }
  }

  lockMouse(event: MouseEvent) {
    if (!this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      this.store.lockMouse();
    }
  }

  releaseMouse(event: MouseEvent) {
    if (!this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      this.store.releaseMouse();
    }
  }

  render(pixels: Pixel[]) {
    this.clearCanvas();

    ([] as Pixel[]).concat(...pixels).forEach((pixel: Pixel) => {
      const { x, y } = pixel;
      if (pixel.fillStyle && this.renderingContext) {
        this.renderingContext.fillStyle = pixel.fillStyle;
        this.renderingContext.fillRect(
          x * this.pixelSize + this.paddingLeft,
          y * this.pixelSize + this.paddingTop,
          this.pixelSize,
          this.pixelSize,
        );
      }
    });

    this.renderGrid();
  }

  renderGrid() {
    if (!this.renderingContext || !this.width || !this.height) {
      return;
    }

    this.renderingContext.strokeStyle = this.fillStyle;
    this.renderingContext.beginPath();

    for (
      let x = this.paddingLeft;
      x <= this.width - this.paddingRight;
      x += this.pixelSize
    ) {
      this.renderingContext.moveTo(x, this.paddingTop);
      this.renderingContext.lineTo(x, this.height - this.paddingBottom);
    }

    for (
      let y = this.paddingTop;
      y <= this.height - this.paddingBottom;
      y += this.pixelSize
    ) {
      this.renderingContext.moveTo(this.paddingLeft, y);
      this.renderingContext.lineTo(this.width - this.paddingRight, y);
    }

    this.renderingContext.stroke();
  }

  clearCanvas() {
    if (!this.renderingContext || !this.width || !this.height) {
      return;
    }

    this.renderingContext.clearRect(0, 0, this.width, this.height);
  }

  private calculateGridSizes() {
    if (!this.width || !this.height) {
      return;
    }

    if (!this.xNodes) {
      this.xNodes = Math.floor(this.width / this.pixelSize);
    }

    if (!this.yNodes) {
      this.yNodes = Math.floor(this.height / this.pixelSize);
    }

    this.paddingX = this.width - this.xNodes * this.pixelSize;
    this.paddingY = this.height - this.yNodes * this.pixelSize;
    this.paddingLeft = Math.ceil(this.paddingX / 3) - 0.5;
    this.paddingTop = Math.ceil(this.paddingY / 3) - 0.5;
    this.paddingRight =
      this.width - this.xNodes * this.pixelSize - this.paddingLeft;
    this.paddingBottom =
      this.height - this.yNodes * this.pixelSize - this.paddingTop;
  }

  private generatePixels() {
    const pixels: Pixel[] = [];
    let index = 0;
    for (let y = 0; y < this.yNodes; y++) {
      for (let x = 0; x < this.xNodes; x++) {
        pixels[index] = {
          id: `${y}-${x}`,
          x,
          y,
          type: 'empty',
        };

        index++;
      }
    }

    return pixels;
  }

  private getPixelAt(x: number, y: number) {
    const pixels = this.store.pixels();
    return pixels.find(
      (pixel) =>
        pixel.x === Math.floor(x / this.pixelSize) &&
        pixel.y === Math.floor(y / this.pixelSize),
    );
  }
}

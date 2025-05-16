import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Props } from 'tippy.js';
import { CardComponent } from '../card/card.component';
import { Color } from '../global-interfaces/color.interface';
import { TooltipDirective } from '../tooltip/tooltip.directive';

@Component({
  selector: 'ui-color-picker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    TooltipDirective,
  ],
  templateUrl: './color-picker.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ColorPickerComponent {
  private readonly _color = new BehaviorSubject<string>('');

  @Input() uiTooltipOptions: Partial<Props> = {
    placement: 'right',
    offset: [0, 20],
  };
  @Output() selectColor: EventEmitter<Color> = new EventEmitter();

  set color(color: string) {
    this._color.next(color);
  }

  get color() {
    return this._color.getValue();
  }
  @Input() colors: Color[] = [
    {
      name: 'Black',
      value: '#000000',
    },
    {
      name: 'Red',
      value: '#C62828',
    },
    {
      name: 'Pink',
      value: '#AD1457',
    },
    {
      name: 'Purple',
      value: '#6A1B9A',
    },
    {
      name: 'Blue',
      value: '#1565C0',
    },
    {
      name: 'Cyan',
      value: '#00838F',
    },
    {
      name: 'Green',
      value: '#2E7D32',
    },
    {
      name: 'Yellow',
      value: '#F9A825',
    },
    {
      name: 'Orange',
      value: '#EF6C00',
    },
    {
      name: 'Brown',
      value: '#4E342E',
    },
    {
      name: 'Gray',
      value: '#424242',
    },
  ];

  setColor(color: Color) {
    this.color = color.value;
    this.selectColor.emit(color);
  }
}

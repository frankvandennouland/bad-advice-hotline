import { CommonModule } from '@angular/common';
import {Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SelectComponent {
  @Input() items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  @Input() selectedItem = 'Choose an algoritm';
  @Output() OnChange: EventEmitter<string> = new EventEmitter<string>();
  show = false;

  toggle() {
    this.show = !this.show;
  }

  select(item: string) {
    this.selectedItem = item;
    this.OnChange.emit(this.selectedItem);
    this.toggle();
  }
}

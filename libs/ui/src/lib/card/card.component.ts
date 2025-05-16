import { CommonModule } from '@angular/common';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './card.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardComponent {
  @Input() styleModifiers = '';
}

import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

@Component({
  selector: 'ui-button',
  standalone: true,
  templateUrl: './button.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonComponent {
  @Input() styleModifiers = '';
  @Input() label = 'Submit';
}

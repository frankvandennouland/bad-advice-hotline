import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { DrawingGridComponent } from './drawing-grid/drawing-grid.component';
import { PlaygroundComponent } from './playground/playground.component';
import { SelectComponent } from './select/select.component';
import { TooltipDirective } from './tooltip/tooltip.directive';

@NgModule({
  imports: [
    CommonModule,
    ColorPickerComponent,
    DrawingGridComponent,
    CardComponent,
    TooltipDirective,
    SelectComponent,
    PlaygroundComponent,
    ButtonComponent,
  ],
  exports: [
    ColorPickerComponent,
    DrawingGridComponent,
    CardComponent,
    TooltipDirective,
    SelectComponent,
    PlaygroundComponent,
    ButtonComponent,
  ],
})
export class UiModule {}

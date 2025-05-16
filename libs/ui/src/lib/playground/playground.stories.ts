import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaygroundStore } from '@bad-advice-hotline/store/playground';
import { action } from '@storybook/addon-actions';
import { Meta, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from '../button/button.component';
import { CardComponent } from '../card/card.component';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { DrawingGridComponent } from '../drawing-grid/drawing-grid.component';
import { Pixel } from '../drawing-grid/interfaces';
import { PlaygroundComponent } from './playground.component';

@Component({
  selector: 'test-playground',
  standalone: true,
  imports: [PlaygroundComponent, CommonModule, ButtonComponent],
  template: `
    <div>
      <ui-playground
        [width]="width"
        [height]="height"
        [pixelSize]="pixelSize"
        [colors]="colors"
        (pixels)="pixels($event)"
        (updateGrid)="updateGrid($event)"
      ></ui-playground>
      <ui-button label="Update Grid" (click)="onUpdateGrid()"></ui-button>
    </div>
  `,
})
class TestPlaygroundComponent {
  private readonly store = inject(PlaygroundStore);
  width = 500;
  height = 500;
  pixelSize = 48;
  colors = [
    {
      name: 'Blue',
      value: '#4287f5',
    },
    {
      name: 'Pink',
      value: '#f542e0',
    },
    {
      name: 'Green',
      value: '#42f595',
    },
  ];
  pixels = action('pixels');
  updateGrid = action('updateGrid');

  onUpdateGrid() {
    const testPixels: Pixel[] = [
      { id: '0-0', x: 0, y: 0, fillStyle: '#4287f5', type: 'wall' },
      { id: '1-1', x: 1, y: 1, fillStyle: '#f542e0', type: 'wall' },
      { id: '2-2', x: 2, y: 2, fillStyle: '#42f595', type: 'wall' },
    ];
    this.updateGrid(testPixels);
    this.store.updatePixels(testPixels);
  }
}

export default {
  title: 'Components/Playground',
  component: PlaygroundComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CardComponent,
        ColorPickerComponent,
        DrawingGridComponent,
        PlaygroundComponent,
        TestPlaygroundComponent,
        CommonModule,
      ],
    }),
  ],
} as Meta;

const template = `
<ui-playground [width]="width" [height]="height" [pixelSize]="pixelSize" [colors]="colors" (pixels)="pixels($event)"></ui-playground>
`;

export const Default = {
  render: (args: any) => ({
    props: args,
    template,
  }),
  args: {
    width: 500,
    height: 500,
    pixelSize: 48,
    colors: [
      {
        name: 'Blue',
        value: '#4287f5',
      },
      {
        name: 'Pink',
        value: '#f542e0',
      },
      {
        name: 'Green',
        value: '#42f595',
      },
      {
        name: 'Purple',
        value: '#9542f5',
      },
      {
        name: 'Orange',
        value: '#f58742',
      },
    ],
  },
};

export const MaxAmount = {
  render: (args: any) => ({
    props: args,
    template,
  }),
  args: {
    width: 500,
    height: 500,
    pixelSize: 48,
    colors: [
      {
        name: 'Blue',
        value: '#4287f5',
        maxAmount: 1,
      },
      {
        name: 'Pink',
        value: '#f542e0',
        maxAmount: 5,
      },
      {
        name: 'Green',
        value: '#42f595',
        maxAmount: 3,
      },
      {
        name: 'Purple',
        value: '#9542f5',
        maxAmount: 10,
      },
      {
        name: 'Orange',
        value: '#f58742',
        maxAmount: 2,
      },
    ],
  },
};

export const WithUpdateGridTest = {
  render: () => ({
    template: '<test-playground></test-playground>',
  }),
};

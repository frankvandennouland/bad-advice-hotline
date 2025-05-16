import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, StoryFn, StoryObj, moduleMetadata } from '@storybook/angular';
import { DrawingGridComponent } from './drawing-grid.component';

export default {
  title: 'Components/Drawing grid',
  component: Component,
  argTypes: {
    width: {
      description: 'width of the canvas',
      control: { type: 'number' },
    },
    height: {
      description: 'height of the canvas',
      control: { type: 'number' },
    },
    xNodes: {
      description: 'number of nodes on the x axes',
      control: { type: 'number' },
    },
    yNodes: {
      description: 'number of nodes on the y axes',
      control: { type: 'number' },
    },
    pixelSize: {
      description: 'size of the pixel within the canvas',
      control: { type: 'number' },
    },
    fillStyle: {
      description: 'pixel fill style',
      control: { type: 'text' },
    },
    disabled: {
      description: 'speaks for its self',
      control: { type: 'boolean' },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule, DrawingGridComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        /* eslint-disable max-len */
        component: `
### Basic setup

\`\`\`
<ui-drawing-grid></ui-drawing-grid>
\`\`\`
`,
        /* eslint-enable max-len */
      },
    },
  },
} as Meta<typeof Component>;

const template = `
<ui-drawing-grid 
[width]="width"
[height]="height"
[xNodes]="xNodes"
[yNodes]="yNodes"
[pixelSize]="pixelSize"
[fillStyle]="fillStyle"
[disabled]="disabled"
>
</ui-drawing-grid>
`;

type Story = StoryObj<typeof Component>;

const defaultDrawingGrid: StoryFn = (args) => ({
  props: args,
  template,
});

export const Default: Story = {
  render: defaultDrawingGrid,
  args: {
    width: 1100,
    height: 1100,
    xNodes: 50,
    yNodes: 50,
    pixelSize: 20,
    fillStyle: '#424242',
    disabled: false,
  },
};

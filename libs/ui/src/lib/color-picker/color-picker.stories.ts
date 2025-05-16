import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, StoryObj, moduleMetadata } from '@storybook/angular';
import { CardComponent } from '../card/card.component';
import { TooltipDirective } from '../tooltip/tooltip.directive';
import { ColorPickerComponent } from './color-picker.component';

const mockColors = [
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
];

export default {
  title: 'Components/Color picker',
  component: Component,
  argTypes: {
    colors: {
      description: 'List of color entries',
      control: { type: 'array' },
    },
    selectColor: {
      action: action('selectColor'),
      description: 'Emits when selecting a color',
      table: { disable: true },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CardComponent,
        TooltipDirective,
        ColorPickerComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        /* eslint-disable max-len */
        component: `
### Basic setup

\`\`\`
<ui-color-picker></ui-color-picker>
\`\`\`
`,
        /* eslint-enable max-len */
      },
    },
  },
} as Meta<typeof Component>;

type Story = StoryObj<typeof Component>;

const template = `
<ui-color-picker [(colors)]="colors"></ui-color-picker>
`;

const defaultColorPicker: StoryFn = (args) => ({
  props: args,
  template,
});

export const Default: Story = {
  render: defaultColorPicker,
  args: {
    colors: mockColors,
  },
};

export const EmptyColourPicker: Story = {
  render: defaultColorPicker,
  args: {
    colors: [],
  },
};

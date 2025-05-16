import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, StoryObj, moduleMetadata } from '@storybook/angular';
import { SelectComponent } from './select.component';

export default {
  title: 'Components/Select',
  component: Component,
  argTypes: {
    items: {
      description: 'select items',
      control: { type: 'array' },
    },
    OnChange: {
      action: action('OnChange'),
      description: 'Emits when changing the selected entry',
      table: { disable: true },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule, SelectComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        /* eslint-disable max-len */
        component: `
### Basic setup

\`\`\`
<ui-select></ui-select>
\`\`\`
`,
        /* eslint-enable max-len */
      },
    },
  },
} as Meta<typeof Component>;

const template = `
<ui-select 
  [items]="items"
  (OnChange)="OnChange($event)"
>
</ui-select>
`;

type Story = StoryObj<typeof Component>;

const defaultSelect: StoryFn = (args) => ({
  props: args,
  template,
});

export const Default: Story = {
  render: defaultSelect,
  args: {
    items: ['Apple', 'Orange', 'Pear', 'Peach'],
  },
};

import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, StoryFn, StoryObj, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from './button.component';

export default {
  title: 'Components/Button',
  component: Component,
  argTypes: {
    styleModifiers: {
      description: 'Extra classes',
      control: { type: 'text' },
    },
    label: {
      description: 'Button label',
      control: { type: 'text' },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule, ButtonComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        /* eslint-disable max-len */
        component: `
### Basic setup

\`\`\`
<ui-button></ui-button>
\`\`\`
`,
        /* eslint-enable max-len */
      },
    },
  },
} as Meta<typeof Component>;

const template = `
<ui-button
  [label]="label"
  [styleModifiers]="styleModifiers"
>
</ui-button>
`;

type Story = StoryObj<typeof Component>;

const defaultButton: StoryFn = (args) => ({
  props: args,
  template,
});

export const Default: Story = {
  render: defaultButton,
  args: {
    label: 'Click me!',
  },
};

export const StyleModifiers: Story = {
  render: defaultButton,
  args: {
    styleModifiers: 'bg-zinc-800 p-2 w-96 rounded-xl',
    label: 'Click me!',
  },
};

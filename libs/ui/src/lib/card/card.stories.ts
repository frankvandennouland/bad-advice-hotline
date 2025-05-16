import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { CardComponent } from './card.component';

export default {
  title: 'Components/Card',
  component: CardComponent,
  argTypes: {
    styleModifiers: {
      description: 'Extra classes',
      control: { type: 'text' },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule, CardComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        /* eslint-disable max-len */
        component: `
### Basic setup

\`\`\`
<ui-card></ui-card>
\`\`\`
`,
        /* eslint-enable max-len */
      },
    },
  },
} as Meta<CardComponent>;

const template = `
<ui-card
  [styleModifiers]="styleModifiers"
>
hello this is some content
</ui-card>
`;
const defaultCard: StoryFn<CardComponent> = (args: CardComponent) => ({
  props: args,
  template,
});

export const Default = defaultCard.bind({});
Default.args = {
  styleModifiers: 'bg-zinc-800 p-2 w-96 rounded-xl',
};

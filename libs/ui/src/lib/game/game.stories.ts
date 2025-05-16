import type { Meta, StoryObj } from '@storybook/angular';
import { GameComponent } from './game.component';

const meta: Meta<GameComponent> = {
  title: 'Game/GameComponent',
  component: GameComponent,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => ({
      moduleMetadata: {
        providers: [],
      },
      template:
        '<div style="max-width: 800px; margin: 0 auto;"><story /></div>',
    }),
  ],
};

export default meta;
type Story = StoryObj<GameComponent>;

export const Default: Story = {
  args: {},
};

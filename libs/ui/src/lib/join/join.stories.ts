import type { Meta, StoryObj } from '@storybook/angular';
import { JoinComponent } from './join.component';

const meta: Meta<JoinComponent> = {
  title: 'Join/JoinComponent',
  component: JoinComponent,
  tags: ['autodocs'],
  argTypes: {
    onJoinGame: { action: 'joinGame' },
  },
};

export default meta;
type Story = StoryObj<JoinComponent>;

export const Default: Story = {
  args: {},
};

import type { Meta, StoryObj } from '@storybook/angular';
import { PlayersComponent } from './players.component';

const meta: Meta<PlayersComponent> = {
  title: 'Players/PlayersComponent',
  component: PlayersComponent,
  tags: ['autodocs'],
  argTypes: {
    players: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<PlayersComponent>;

export const Default: Story = {
  args: {
    players: [
      {
        id: '1',
        name: 'Alice',
        isHost: true,
        score: 15,
      },
      {
        id: '2',
        name: 'Bob',
        isHost: false,
        score: 8,
      },
      {
        id: '3',
        name: 'Charlie',
        isHost: false,
        score: 12,
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    players: [],
  },
};

export const SinglePlayer: Story = {
  args: {
    players: [
      {
        id: '1',
        name: 'Alice',
        isHost: true,
        score: 0,
      },
    ],
  },
};

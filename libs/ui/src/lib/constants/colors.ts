import { Color } from '../global-interfaces/color.interface';

export const AVAILABLE_COLORS: Color[] = [
  {
    name: 'Wall',
    value: '#000000',
    maxAmount: undefined,
    type: 'wall',
  },
  {
    name: 'Start',
    value: '#42f595',
    maxAmount: 1,
    type: 'start',
  },
  {
    name: 'End',
    value: '#f54242',
    maxAmount: 1,
    type: 'end',
  },
  {
    name: 'Path',
    value: '#4CAF50',
    maxAmount: undefined,
    type: 'path',
  },
  {
    name: 'Empty',
    value: 'transparent',
    maxAmount: undefined,
    type: 'empty',
  },
  {
    name: 'Visited',
    value: '#cccccc',
    maxAmount: undefined,
    type: 'visited',
  },
];

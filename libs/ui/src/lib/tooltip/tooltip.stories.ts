import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';
import { TooltipDirective } from './tooltip.directive';

@Component({
  selector: 'ui-dummy-button',
  template: `<button></button>`,
})
class DummyComponent {}

export default {
  title: 'Directives/Tooltip',
  component: DummyComponent,
  parameters: {
    docs: {
      description: {
        /* eslint-disable max-len */
        component: `
### Basic setup

\`\`\`
<button 
  [uiTooltip]="'Hello World'"
  [uiTooltipOptions]="{placement: 'bottom'}"
  class="btn btn-primary mt-12 ml-12"
>
  dummy button
</button>
\`\`\`
        `,
      },
    },
  },
} as Meta;

const template = `
<button 
  [uiTooltip]="tooltip"
  [uiTooltipOptions]="tooltipOptions"
  class="fixed top-1/2 right-1/2 -translate-y-1/2"
>
  dummy button
</button>
`;
const defaultTooltip: StoryFn<DummyComponent> = (args: DummyComponent) => ({
  props: args,
  template,
  moduleMetadata: {
    imports: [TooltipDirective],
  },
});

export const Default = defaultTooltip.bind({});
Default.args = {
  tooltip: 'Hello World',
};

export const Right = defaultTooltip.bind({});
Right.args = {
  tooltip: 'Hello World',
  tooltipOptions: { placement: 'right' },
};

export const left = defaultTooltip.bind({});
left.args = {
  tooltip: 'Hello World',
  tooltipOptions: { placement: 'left' },
};

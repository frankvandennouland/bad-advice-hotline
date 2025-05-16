// @NOTE: this way of importing does not work in combination with module style usage
// See https://github.com/storybookjs/storybook/issues/6364 for more info
// import '!style-loader!css-loader!../src/scss/index.scss';
import { DocsContainer, DocsPage } from '@storybook/addon-docs';

export const parameters = {
	docs: {
		container: DocsContainer,
		page: DocsPage,
	},
};

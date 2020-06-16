import '!style-loader!css-loader!sass-loader!../src/sass/global.scss'
import { withConsole } from '@storybook/addon-console'
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks'
import { withKnobs } from '@storybook/addon-knobs'
import { addDecorator } from '@storybook/react'
import { withHTML } from '@whitespace/storybook-addon-html/react'
import { AdobeXDArtboards } from './config'

/**
 * @file Storybook Configuration
 * @see {@link https://flexbook.flexdevelopment.now.sh/docs/storybook-config}
 */

// Customize Storybook UI
export const parameters = {
  a11y: {},
  actions: { argTypesRegex: '^on.*' },
  controls: { expanded: true },
  docs: {
    container: DocsContainer,
    page: DocsPage
  },
  options: { showRoots: true },
  viewport: { viewports: AdobeXDArtboards }
}

// Receive console outputs as a console, warn and error in the actions panel
addDecorator((storyFn, context) =>
  withConsole({
    consoleInclude: [new URLSearchParams(window.location.search).get('id')]
  })(storyFn)(context)
)

// Display compiled HTML for each story
addDecorator(
  withHTML({
    prettier: {
      parser: 'json'
    }
  })
)

// Stress test components
addDecorator(
  withKnobs({
    escapeHTML: false
  })
)

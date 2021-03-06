const { merge, omit } = require('lodash')
const path = require('path')
const babelOptions = require('../babel.config.json')
const sassOptions = require('../.sassrc.json')

/**
 * @file Storybook Configuration
 * @see {@link https://woodmont.modelb.now.sh/docs/storybook-config}
 */

const include = [path.resolve(__dirname, '../src')]

module.exports = {
  /**
   * Project addons.
   *
   * @see {@link https://storybook.js.org/docs/addons/introduction/}
   *
   * @property {Array<Object, String>} addons
   */
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    '@whitespace/storybook-addon-html',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true
      }
    },
    '@storybook/addon-controls',
    '@storybook/addon-actions'
  ],

  /**
   * Story paths to load. The sidebar layout will match the order of the array.
   *
   * @property {string[]} stories
   */
  stories: [
    '../src/stories/index.stories.mdx',
    '../src/stories/blocks/*.stories.mdx',
    '../src/lib/**/**/stories/*.stories.tsx',
    '../src/stories/views/**/*.stories.tsx'
  ],

  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: path.resolve(__dirname, './tsconfig.json'),
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
    }
  },

  /**
   * Alters the Storybook Webpack configuration.
   *
   * @param param1.configType has a value of 'DEVELOPMENT' or 'PRODUCTION'.
   * 'PRODUCTION' is used when building the static version of storybook.
   *
   * @param {object} config - Base Webpack config
   * @param {object} param1 - Storybook config
   * @param {string} param1.configType - Storybook development environment
   * @returns {object} Webpack configuration
   */
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = merge({}, config.resolve.alias, {
      declarations: path.join(__dirname, '../src/lib/declarations'),
      hooks: path.join(__dirname, '../src/hooks'),
      lib: path.join(__dirname, '../src/lib'),
      logger: path.join(__dirname, '../src/logger'),
      sass: path.join(__dirname, '../src/sass'),
      storybook: __dirname,
      utils: path.join(__dirname, '../src/utils')
    })

    const sassLoader = {
      loader: 'sass-loader',
      options: {
        data: sassOptions.data,
        implementation: require('node-sass'),
        sassOptions: omit(sassOptions, ['data'])
      }
    }

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        {
          loader: 'sass-loader',
          options: {
            data: sassOptions.data,
            implementation: require('node-sass'),
            sassOptions: omit(sassOptions, ['data'])
          }
        }
      ]
    })

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include,
      use: [
        {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: './.storybook/tsconfig.json',
            babelCore: '@babel/core',
            babelOptions: { babelrc: false, ...babelOptions },
            useBabel: true
          }
        }
      ]
    })

    config.resolve.extensions.push('.ts', '.tsx')

    return config
  }
}

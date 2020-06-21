/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const nodeExternals = require('webpack-node-externals')
const babelOptions = require('./.babelrc.json')
const pkg = require('./package.json')

/* eslint-enable @typescript-eslint/no-var-requires */

/**
 * @file Webpack Configuration Properties
 * @see {@link https://webpack.js.org/configuration}
 */

/* eslint-disable sort-keys */

module.exports = {
  entry: ['./src/index.ts'],
  mode: 'production',
  output: {
    filename: `woodmont-${pkg.version}.js`,
    library: 'Woodmont',
    libraryTarget: 'global',
    path: path.resolve(__dirname, 'build')
  },
  target: 'node',
  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules')
    })
  ],
  resolve: {
    alias: {
      declarations: path.join(__dirname, './src/declarations'),
      hooks: path.join(__dirname, './src/hooks'),
      lib: path.join(__dirname, './src/lib'),
      logger: path.join(__dirname, './src/logger'),
      sass: path.join(__dirname, './src/sass'),
      utils: path.join(__dirname, './src/utils')
    },
    extensions: ['.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: { loader: 'url-loader' }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              data: "@import '../../../../sass/themes/default.scss';",
              implementation: require('node-sass'),
              sassOptions: {
                sassOptions: {
                  includePaths: './src/lib/**/**/sass/*.scss',
                  indentedSyntax: false,
                  outputStyle: 'expanded'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, './src')],
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: './tsconfig.prod.json'
            }
          }
        ]
      }
    ]
  }
}

/* eslint-enable sort-keys */

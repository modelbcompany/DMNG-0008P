/* eslint-disable @typescript-eslint/no-var-requires */

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const { DefinePlugin } = require('webpack')
const babelOptions = require('./.babelrc.json')
const pkg = require('./package.json')

/* eslint-enable @typescript-eslint/no-var-requires */

/**
 * @file Webpack Development Configuration
 * @see {@link https://webpack.js.org/configuration}
 */

/* eslint-disable sort-keys */

module.exports = {
  entry: {
    main: './src/index.ts',
    theme: './src/sass/global.scss'
  },
  mode: 'development',
  output: {
    filename: pathData => {
      return pathData.chunk.name === 'main'
        ? `woodmont-${pkg.version}.js`
        : `woodmont-[name]-${pkg.version}.js`
    },
    library: 'Woodmont',
    libraryTarget: 'window',
    path: path.resolve(
      __dirname,
      '../../app/public/wp-content/themes/modelb/assets/js/lib'
    )
  },
  resolve: {
    alias: {
      api: path.join(__dirname, './src/api'),
      declarations: path.join(__dirname, './src/declarations'),
      hooks: path.join(__dirname, './src/hooks'),
      lib: path.join(__dirname, './src/lib'),
      logger: path.join(__dirname, './src/logger'),
      sass: path.join(__dirname, './src/sass'),
      utils: path.join(__dirname, './src/utils')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
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
              prependData: loaderContext => {
                const { resourcePath, rootContext } = loaderContext
                const relativePath = path.relative(rootContext, resourcePath)

                if (relativePath === 'src/sass/global.scss') return ''

                return "@import '../../../../sass/themes/default.scss';"
              },
              implementation: require('node-sass'),
              sassOptions: {
                includePaths: ['./src/lib/**/**/sass/*.scss'],
                indentedSyntax: false,
                outputStyle: 'expanded'
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /(src\/lib)/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, './src')],
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: './tsconfig.prod.json',
              babelCore: '@babel/core',
              babelOptions: { babelrc: false, ...babelOptions },
              useBabel: true,
              useCache: true
            }
          }
        ]
      }
    ]
  },
  target: 'web',
  externals: {
    jquery: '$',
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      'process.env.STORYBOOK_API_URL':
        "'https://woodmontapi-lexusdrumgold.modelb.vercel.app'"
    }),
    new MiniCssExtractPlugin({
      filename: '../../styles/woodmont.dev.css'
    })
  ]
}

/* eslint-enable sort-keys */

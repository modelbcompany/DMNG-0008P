import { common, grey } from '@material-ui/core/colors'
import _ from 'lodash'

/**
 * @file Color Palettes
 * @module storybook/config/colors
 */

/**
 * Brand colors.
 */
export const BrandPalette = {
  '$color-brand-cape-palliser': {
    name: 'Cape Palliser',
    value: 'rgba(170, 123, 63, 1)'
  },
  '$color-brand-cod-gray': {
    name: 'Cod Gray',
    value: 'rgba(10, 10, 10, 1)'
  },
  '$color-brand-rolling-stone': {
    name: 'Rolling Stone',
    value: 'rgba(111, 118, 123, 1)'
  },
  '$color-brand-silver-rust': {
    name: 'Silver Rust',
    value: 'rgba(203, 195, 188, 1)'
  },
  '$color-brand-tussock': {
    name: 'Tussock',
    value: 'rgba(191, 141, 74, 1)'
  }
}

/**
 * React color palette.
 */
export const ReactColorPalette = {
  '$color-react-blue': {
    name: 'React Blue',
    value: '#61dafb'
  },
  '$color-react-gray': {
    name: 'React Gray',
    value: '#282c34'
  }
}

/**
 * Alert status palette.
 */
export const StatusPalette = {
  '$color-status-positive': {
    name: 'Positive',
    value: ''
  },
  '$color-status-warning': {
    name: 'Warning',
    value: ''
  },
  '$color-status-danger': {
    name: 'Danger',
    value: ''
  }
}

/**
 * Application color palettes.
 */
export const Colors = {
  brand: BrandPalette,
  material: (() => {
    const colors: Record<string, unknown> = {
      $black: { name: 'Black', value: common.black }
    }

    for (const shade in grey) {
      if (!['A100', 'A200', 'A400', 'A700'].includes(shade)) {
        colors[`$grey-${shade}`] = {
          name: `Grey ${shade}`,
          value: grey[shade]
        }
      }
    }

    colors.$white = { name: 'White', value: common.white }

    return colors
  })(),
  react: ReactColorPalette,
  status: StatusPalette
}

/**
 * Returns a color object formatted for use with Storybook Docs, or the
 * Storybook Backgrounds addon.
 *
 * @param path - The path of the color to retrieve from {@link Colors} object
 * @param docs - If true, format color object for use with Storybook Docs.
 * Otherwise format for use with Storybook Backgrounds addon
 */
export const getColorItem = (path, docs = true) => {
  if (!_.isString(path)) return {}

  const color = _.get(Colors, path, { title: '', subtitle: '', colors: [] })

  if (!docs) return color

  path = path.split('.')

  return {
    title: color.name,
    subtitle: path[path.length - 1],
    colors: [color.value]
  }
}

import { text } from '@storybook/addon-knobs'
import { Image, ImageProps } from 'lib'
import React, { ReactElement } from 'react'
import { getColorItem } from 'storybook/config'

/**
 * @file Stories - Image
 * @module Stories/Components/Atoms/Image
 */

export default {
  component: Image,
  title: 'Components/Atoms/Image'
}

/**
 * Default {@link Image} story.
 */
export const Default = (args: ImageProps): ReactElement<ImageProps> => (
  <Image
    {...args}
    alt={text('alt', 'Storybook badge')}
    src={text(
      'src',
      'https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg'
    )}
  />
)

/**
 * React logo {@link Image} story.
 */
export const ReactLogo = (args: ImageProps): ReactElement<ImageProps> => (
  <Image
    {...args}
    src='/images/react-logo.svg'
    alt='React logo'
    className='react-logo-spin'
  />
)

ReactLogo.parameters = {
  backgrounds: {
    default: 'React Gray',
    values: [getColorItem('react.$color-react-gray', false)]
  },
  knobs: {
    disabled: true
  }
}

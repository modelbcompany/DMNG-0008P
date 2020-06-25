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
  <Image {...args} />
)

Default.args = {
  alt: 'Storybook badge',
  src:
    'https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg'
}

/**
 * {@link Floorplan} {@link Image} story.
 */
export const FloorplanImage = (args: ImageProps): ReactElement<ImageProps> => (
  <Image {...args} />
)

FloorplanImage.storyName = 'Floorplan'
FloorplanImage.args = {
  alt: 'Unit #106 floorplan',
  className: 'floorplan-img',
  src: '/images/fp-image-944x1024.jpg'
}

/**
 * React logo {@link Image} story.
 */
export const ReactLogo = (args: ImageProps): ReactElement<ImageProps> => (
  <Image {...args} />
)

ReactLogo.args = {
  alt: 'React logo',
  className: 'react-logo-spin',
  src: '/images/react-logo.svg'
}

ReactLogo.parameters = {
  backgrounds: {
    default: 'React Gray',
    values: [getColorItem('react.$color-react-gray', false)]
  }
}

import React, { ReactElement } from 'react'
import { getColorItem } from 'storybook/config'
import { Heading, HeadingProps } from '../Heading'

/**
 * @file Stories - Heading
 * @module Stories/Components/Atoms/Heading
 */

export default {
  component: Heading,
  title: 'Components/Atoms/Heading'
}

/**
 * Default {@link Heading} story.
 */
export const Default = (args: HeadingProps): ReactElement<HeadingProps> => (
  <Heading {...args} />
)

Default.args = {}

/**
 * {@link FloorplansGrid} {@link Heading} story.
 */
export const FloorplansGridTitle = (
  args: HeadingProps
): ReactElement<HeadingProps> => <Heading {...args} />

FloorplansGridTitle.storyName = 'FloorplansGrid'

FloorplansGridTitle.args = {
  children: 'One Bedroom',
  className:
    'is-uppercase is-white-text is-center-aligned-text floorplans-grid-title',
  size: 3
}

FloorplansGridTitle.parameters = {
  backgrounds: {
    default: 'Marble Brown',
    values: [getColorItem('brand.$color-brand-marble-brown', false)]
  }
}

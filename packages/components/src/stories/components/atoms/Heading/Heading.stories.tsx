import { Heading, HeadingProps } from 'lib'
import React, { ReactElement } from 'react'
import { getColorItem } from 'storybook/config'

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

Default.storyName = 'Level 1'
Default.args = {
  className: 'mb-heading--1'
}

/**
 * Level three {@link Heading} story.
 */
export const Level3 = (args: HeadingProps): ReactElement<HeadingProps> => (
  <Heading {...args} />
)

Level3.args = {
  children: 'One Bedroom',
  className: 'mb-heading--3 center-text uppercase',
  size: 3
}

Level3.parameters = {
  backgrounds: {
    default: 'Marble Brown',
    values: [getColorItem('brand.$color-brand-marble-brown', false)]
  }
}

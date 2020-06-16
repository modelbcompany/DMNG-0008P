import { Heading, HeadingProps } from 'lib'
import React, { ReactElement } from 'react'

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

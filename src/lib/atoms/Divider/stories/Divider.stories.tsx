import { Divider, DividerProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - Divider
 * @module Stories/Components/Atoms/Divider
 */

export default {
  component: Divider,
  title: 'Components/Atoms/Divider'
}

/**
 * Default {@link Divider} story.
 */
export const Default = (args: DividerProps): ReactElement<DividerProps> => (
  <Divider {...args} />
)

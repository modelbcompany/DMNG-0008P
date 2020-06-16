import { Caption, CaptionProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - Caption
 * @module Stories/Components/Atoms/Caption
 */

export default {
  component: Caption,
  title: 'Components/Atoms/Caption'
}

/**
 * Default {@link Caption} story.
 */
export const Default = (args: CaptionProps): ReactElement<CaptionProps> => (
  <Caption {...args} />
)

import React, { ReactElement } from 'react'
import { Paragraph, ParagraphProps } from '../Paragraph'

/**
 * @file Stories - Paragraph
 * @module Stories/Components/Atoms/Paragraph
 */

export default {
  component: Paragraph,
  title: 'Components/Atoms/Paragraph'
}

/**
 * Default {@link Paragraph} story.
 */
export const Default = (args: ParagraphProps): ReactElement<ParagraphProps> => (
  <Paragraph {...args} />
)

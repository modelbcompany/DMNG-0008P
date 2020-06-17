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

Default.args = {
  children: 'Choose from a variety of spacious and contemporary floor plans available in one-bedroom, one-bedroom with den, two-bedroom, two-bedroom with den, and three-bedroom layouts.',
  className: 'adt-floorplans-blurb'
}
import { Paragraph, ParagraphProps } from 'lib'
import React, { ReactElement } from 'react'

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

Default.args = {}

/**
 * Subheading {@link Paragraph} story.
 */
export const Subheading = (
  args: ParagraphProps
): ReactElement<ParagraphProps> => <Paragraph {...args} />

Subheading.args = {
  children:
    'Choose from a variety of spacious and contemporary floor plans available in one-bedroom, one-bedroom with den, two-bedroom, two-bedroom with den, and three-bedroom layouts.',
  className: 'mb-paragraph--subheading is-centered-text'
}

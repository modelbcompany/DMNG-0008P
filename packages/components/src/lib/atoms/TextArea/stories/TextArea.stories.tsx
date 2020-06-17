import React, { ReactElement } from 'react'
import { TextArea, TextAreaProps } from '../TextArea'

/**
 * @file Stories - TextArea
 * @module Stories/Components/Atoms/TextArea
 */

export default {
  component: TextArea,
  title: 'Components/Atoms/TextArea'
}

/**
 * Default {@link TextArea} story.
 */
export const Default = (args: TextAreaProps): ReactElement<TextAreaProps> => (
  <TextArea {...args} />
)

import { Span, SpanProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - Span
 * @module Stories/Components/Atoms/Span
 */

export default {
  component: Span,
  title: 'Components/Atoms/Span'
}

/**
 * Default {@link Span} story.
 */
export const Default = (args: SpanProps): ReactElement<SpanProps> => (
  <Span {...args} />
)

Default.args = {
  children: 'Span text'
}

import React, { ReactElement } from 'react'
import { Span, SpanProps } from '../Span'

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

/**
 * Screen dimmer {@link Span} story.
 */
export const Dimmer = (args: SpanProps): ReactElement<SpanProps> => (
  <Span {...args} />
)

Dimmer.args = {
  className: 'dimmer'
}

Dimmer.parameters = {}

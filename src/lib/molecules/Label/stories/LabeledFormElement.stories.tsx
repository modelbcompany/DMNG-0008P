import { LabeledFormElement, LabeledFormElementProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - LabeledFormElement
 * @module Stories/Components/Molecules/Label/Components/LabeledFormElement
 */

export default {
  component: LabeledFormElement,
  title: 'Components/Molecules/Label/Components/LabeledFormElement'
}

/**
 * Default {@link LabeledFormElement} story.
 */
export const Default = (
  args: LabeledFormElementProps
): ReactElement<LabeledFormElementProps> => <LabeledFormElement {...args} />

Default.args = {}

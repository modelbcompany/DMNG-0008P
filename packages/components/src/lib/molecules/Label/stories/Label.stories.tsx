import { Label, LabelProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - Label
 * @module Stories/Components/Molecules/Label
 */

export default {
  component: Label,
  title: 'Components/Molecules/Label'
}

/**
 * Default {@link Label} story.
 */
export const Default = (args: LabelProps): ReactElement<LabelProps> => (
  <Label {...args} />
)

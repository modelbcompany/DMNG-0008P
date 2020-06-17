import React, { ReactElement } from 'react'
import { Label, LabelProps } from '../Label'

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

import { OptionProps } from 'declarations'
import { Option } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - Option
 * @module Stories/Components/Atoms/Option
 */

export default {
  component: Option,
  title: 'Components/Atoms/Option'
}

/**
 * Default {@link Option} story.
 */
export const Default = (args: OptionProps): ReactElement<OptionProps> => (
  <Option {...args} />
)

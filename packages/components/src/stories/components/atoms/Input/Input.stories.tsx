import { Input, InputProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - Input
 * @module Stories/Components/Atoms/Input
 */

export default {
  component: Input,
  title: 'Components/Atoms/Input'
}

/**
 * Default {@link Input} story.
 */
export const Default = (args: InputProps): ReactElement<InputProps> => (
  <Input {...args} />
)

Default.args = {
  placeholder: 'Placeholder text'
}

/**
 * Checkbox {@link Input} story.
 */
export const Checkbox = (args: InputProps): ReactElement<InputProps> => (
  <Input {...args} />
)

Checkbox.args = {
  className: 'mb-input--light',
  type: 'checkbox'
}

/**
 * Date {@link Input} story.
 */
export const DateTime = (args: InputProps): ReactElement<InputProps> => (
  <Input {...args} />
)

DateTime.storyName = 'Date'
DateTime.args = {
  className: 'mb-input--light',
  type: 'date'
}

/**
 * Email {@link Input} story.
 */
export const Email = (args: InputProps): ReactElement<InputProps> => (
  <Input {...args} />
)

Email.args = {
  className: 'mb-input--light',
  placeholder: 'Email*',
  type: 'email'
}

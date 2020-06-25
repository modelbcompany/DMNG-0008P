import { Button, ButtonProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - Button
 * @module Stories/Components/Atoms/Button
 */

export default {
  component: Button,
  title: 'Components/Atoms/Button'
}

/**
 * Default {@link Button} story.
 */
export const Default = (args: ButtonProps): ReactElement<ButtonProps> => (
  <Button {...args} />
)

Default.args = {
  children: 'Button text'
}

/**
 * {@link Form} {@link Button} story.
 */
export const FormButton = (args: ButtonProps): ReactElement<ButtonProps> => (
  <Button {...args} />
)

FormButton.storyName = 'Form'
FormButton.args = {
  children: 'Next',
  className: 'mb-button--form is-uppercase',
  type: 'button'
}

/**
 * Gradient {@link Button} story.
 */
export const GradientButton = (
  args: ButtonProps
): ReactElement<ButtonProps> => <Button {...args} />

GradientButton.storyName = 'Gradient'
GradientButton.args = {
  children: 'Search',
  className: 'mb-button--gradient is-uppercase',
  type: 'submit'
}

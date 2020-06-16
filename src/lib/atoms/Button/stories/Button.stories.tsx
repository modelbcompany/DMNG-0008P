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

/**
 * {@link Icon} {@link Button} story.
 */
export const IconButton = Default.bind(null)

IconButton['storyName'] = 'Icon'

IconButton['args'] = {
  ...Default['args'],
  children: 'Next',
  icon: {
    children: 'keyboard_arrow_right',
    'data-position': 'right'
  }
}

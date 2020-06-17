import React, { ReactElement } from 'react'
import { Button, ButtonProps } from '../Button'

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

Default.args = {}

/**
 * {@link FloorplansSearchForm} {@link Button} story.
 */
export const FloorplansSearchFormButton = (
  args: ButtonProps
): ReactElement<ButtonProps> => <Button {...args} />

FloorplansSearchFormButton.storyName = 'FloorplansSearchForm'
FloorplansSearchFormButton.args = {
  children: 'Search',
  className: 'gradient-bkg uppercase lg',
  type: 'submit'
}

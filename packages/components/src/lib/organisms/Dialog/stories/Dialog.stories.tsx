import React, { ReactElement } from 'react'
import { Dialog, DialogProps } from '../Dialog'

/**
 * @file Stories - Dialog
 * @module Stories/Components/Organisms/Dialog
 */

export default {
  component: Dialog,
  title: 'Components/Organisms/Dialog'
}

/**
 * Default {@link Dialog} story.
 */
export const Default = (args: DialogProps): ReactElement<DialogProps> => (
  <Dialog {...args} />
)

Default.args = {
  initialVisibility: true
}

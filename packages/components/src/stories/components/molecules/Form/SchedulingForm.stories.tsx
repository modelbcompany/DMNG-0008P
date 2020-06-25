import { SchedulingForm, SchedulingFormProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - SchedulingForm
 * @module lib/Molecules/Form/stories/SchedulingForm
 */

export default {
  component: SchedulingForm,
  title: 'Components/Molecules/Form/Components/SchedulingForm'
}

/**
 * Default {@link SchedulingForm} story.
 */
export const Default = (
  args: SchedulingFormProps
): ReactElement<SchedulingFormProps> => <SchedulingForm {...args} />

Default.args = {}

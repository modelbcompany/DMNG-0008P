import React, { ReactElement } from 'react'
import { FormField, FormFieldProps } from '../Fieldset'

/**
 * @file Stories - FormField
 * @module Stories/Components/Molecules/Fieldset/Components/FormField
 */

export default {
  component: FormField,
  title: 'Components/Molecules/Fieldset/Components/FormField'
}

/**
 * Default {@link LabeledFormElement} story.
 */
export const Default = (args: FormFieldProps): ReactElement<FormFieldProps> => (
  <FormField {...args} />
)

Default.args = {}

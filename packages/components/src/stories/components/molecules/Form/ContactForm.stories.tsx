import { ContactForm, ContactFormProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - ContactForm
 * @module lib/Molecules/Form/stories/ContactForm
 */

export default {
  component: ContactForm,
  title: 'Components/Molecules/Form/Components/ContactForm'
}

/**
 * Default {@link ContactForm} story.
 */
export const Default = (
  args: ContactFormProps
): ReactElement<ContactFormProps> => <ContactForm {...args} />

Default.args = {}

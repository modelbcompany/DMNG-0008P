import { Form, FormProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - Form
 * @module Stories/Components/Molecules/Form
 */

export default {
  component: Form,
  title: 'Components/Molecules/Form'
}

/**
 * Default {@link Form} story.
 */
export const Default = (): ReactElement<FormProps> => <Form />

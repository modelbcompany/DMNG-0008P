import { FormSubmissionEventHandler } from 'declarations'
import { useForm, useMutatedProps } from 'hooks'
import { Button, FormField, FormProps, Input } from 'lib'
import React, { FC } from 'react'
import { Form } from '../Form'

/**
 * @module Components/Molecules/Form/ContactForm
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/form}
 */

/**
 * {@link ContactForm} initial state.
 */
export type ContactFormState = {
  email: string
  firstName: string
  lastName: string
  phone: string
}

/**
 * {@link ContactForm} initial state.
 */
const INITIAL_STATE: ContactFormState = {
  email: '',
  firstName: '',
  lastName: '',
  phone: ''
}

export { INITIAL_STATE as CONTACT_FORM_INITIAL_STATE }

/**
 * {@link ContactForm} component properties.
 */
export type ContactFormProps = FormProps & {
  contact?(formState: ContactFormState): any
}

/**
 * Renders a `Form` component with the class `mb-form--contact`.
 */
export const ContactForm: FC<ContactFormProps> = ({ contact, ...rest }) => {
  const mutatedProps = useMutatedProps(rest, 'mb-form--contact')

  const { form, updateForm } = useForm(
    INITIAL_STATE,
    (contact as unknown) as FormSubmissionEventHandler
  )

  return (
    <Form {...mutatedProps}>
      <FormField name='firstName'>
        <Input
          className='mb-input--light'
          name='firstName'
          onChange={event => {
            event.persist()
            updateForm('firstName', event.target.value)
          }}
          placeholder='First Name*'
          required
        />
      </FormField>

      <FormField name='lastName'>
        <Input
          className='mb-input--light'
          name='lastName'
          onChange={event => {
            event.persist()
            updateForm('lastName', event.target.value)
          }}
          placeholder='Last Name*'
          required
        />
      </FormField>

      <FormField name='email'>
        <Input
          className='mb-input--light'
          name='email'
          onChange={event => {
            event.persist()
            updateForm('email', event.target.value)
          }}
          placeholder='Email*'
          required
          type='email'
        />
      </FormField>

      <FormField name='phone'>
        <Input
          className='mb-input--light'
          name='email'
          onChange={event => {
            event.persist()
            updateForm('phone', event.target.value)
          }}
          placeholder='Phone Number'
          type='tel'
        />
      </FormField>

      <FormField className='form-footer'>
        <Button
          className='mb-button--form uppercase'
          name='contact'
          onClick={(event: React.MouseEvent) => {
            if (event.preventDefault) event.preventDefault()
            return (contact as FormSubmissionEventHandler)(form)
          }}
          type='submit'
        >
          Submit
        </Button>
      </FormField>
    </Form>
  )
}

ContactForm.defaultProps = {
  contact: form => {
    console.warn({ ContactForm: { '@todo contact': form } })
  }
}

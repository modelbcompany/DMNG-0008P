import { FormSubmissionEventHandler } from 'declarations'
import { useForm, useMutatedProps } from 'hooks'
import { Button, Calendar, Container, FormField, FormProps } from 'lib'
import React, { FC, useState } from 'react'
import { Form } from '../Form'
import '../sass/Form.scss'

/**
 * @module Components/Molecules/Form/SchedulingForm
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/form}
 */

/**
 * {@link SchedulingForm} initial state.
 */
export type SchedulingFormState = {
  apptDate: string
  apptTime: string
  email: string
  phone: string
  source?: string
}

/**
 * {@link SchedulingForm} initial state.
 */
const INITIAL_STATE: SchedulingFormState = {
  apptDate: '',
  apptTime: '',
  email: '',
  phone: '',
  source: 'website'
}

export { INITIAL_STATE as SCHEDULING_FORM_INITIAL_STATE }

/**
 * {@link SchedulingForm} component properties.
 */
export type SchedulingFormProps = FormProps & {
  scheduleTour?(formState: SchedulingFormState): any
}

/**
 * Renders a {@link Form} component with the class `scheduling-form`.
 */
export const SchedulingForm: FC<SchedulingFormProps> = ({
  scheduleTour,
  ...rest
}) => {
  const mutatedProps = useMutatedProps(rest, 'scheduling-form')

  const { form, updateForm } = useForm(
    INITIAL_STATE,
    (scheduleTour as unknown) as FormSubmissionEventHandler
  )
  const [formViewID, setFormViewID] = useState(0)

  // const [apiResponseMessage, setAPIResponseMessage] = useState('')

  return (
    <Form {...mutatedProps}>
      <Container className='form-container'>
        {(() => {
          if (formViewID) {
            return (
              <React.Fragment>
                <FormField>
                  <Button
                    className='uppercase'
                    name='schedule'
                    onClick={(event: React.MouseEvent) => {
                      if (event.preventDefault) event.preventDefault()
                      return (scheduleTour as FormSubmissionEventHandler)(form)
                    }}
                    type='submit'
                  >
                    Schedule
                  </Button>
                </FormField>
              </React.Fragment>
            )
          }

          return (
            <React.Fragment>
              <Calendar
                onChange={(date: Date) =>
                  updateForm('apptDate', date.toLocaleDateString('en-US'))
                }
              />

              <FormField>
                <Button
                  className='uppercase'
                  name='next'
                  onClick={() => {
                    if (form.apptDate?.length) setFormViewID(1)
                  }}
                >
                  Next
                </Button>
              </FormField>
            </React.Fragment>
          )
        })()}
      </Container>
    </Form>
  )
}

SchedulingForm.defaultProps = {
  scheduleTour: form => {
    console.warn({ SchedulingForm: { '@todo scheduleTour': form } })
  }
}

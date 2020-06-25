import { FeathersErrorJSON } from '@feathersjs/errors'
import api from 'api'
import { AnyObject, FormSubmissionEventHandler } from 'declarations'
import { useForm, useMutatedProps } from 'hooks'
import {
  Button,
  Calendar,
  Container,
  FormField,
  FormProps,
  Input,
  Select
} from 'lib'
import logger from 'logger'
import React, { FC, useEffect, useState } from 'react'
import { Form } from '../Form'

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
 * API responses from the `Scheduling` service.
 */
export type SchedulingAPIResponse = AnyObject[] | FeathersErrorJSON

/**
 * Renders a {@link Form} component with the class `mb-form--tour`.
 */
export const SchedulingForm: FC<SchedulingFormProps> = ({
  scheduleTour,
  ...rest
}) => {
  const mutatedProps = useMutatedProps(rest, 'mb-form--tour')

  const { form, updateForm } = useForm(
    INITIAL_STATE,
    (scheduleTour as unknown) as FormSubmissionEventHandler
  )

  const [apiError, setAPIError] = useState<FeathersErrorJSON>()
  const [availableAppts, setAvailableAppts] = useState<AnyObject[]>([])
  const [formViewID, setFormViewID] = useState<number>(0)

  useEffect(() => {
    async function getAvailableAppointments() {
      let appointments = [] as SchedulingAPIResponse

      try {
        appointments = await api.service('scheduling').find()
        if ((appointments as FeathersErrorJSON).code) throw appointments
      } catch (err) {
        logger.error({ SchedulingForm: err })

        setAPIError(err)
        throw err
      }

      setAvailableAppts([...(appointments as AnyObject[])])
    }

    getAvailableAppointments()
  }, [])

  if (apiError) {
    //
  }

  return (
    <Form {...mutatedProps}>
      {(() => {
        if (formViewID) {
          return (
            <Container className='form-container column fields-view'>
              <FormField name='apptDate_apptTime'>
                <Input
                  className='mb-input--light'
                  name='apptDate'
                  value={form.apptDate}
                  readOnly
                />

                <Select
                  className='mb-select--light'
                  name='apptTime'
                  initialOptions={
                    availableAppts.find(appt => {
                      return appt.date === form.apptDate
                    })?.times
                  }
                  isSearchable={false}
                  onChange={option => updateForm('apptTime', option.value)}
                  placeholder={null}
                />
              </FormField>

              <FormField name='firstName'>
                <Input
                  className='mb-input--light'
                  name='firstName'
                  onChange={event => {
                    event.persist()
                    updateForm('firstName', event.target.value)
                  }}
                  placeholder='First Name*'
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
                  placeholder='Email Address*'
                  type='email'
                />
              </FormField>

              <FormField className='form-footer'>
                <Button
                  className='mb-button--form uppercase'
                  name='back'
                  onClick={() => setFormViewID(0)}
                >
                  Back
                </Button>

                <Button
                  className='mb-button--form uppercase'
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
            </Container>
          )
        }

        return (
          <Container className='form-container calendar-view'>
            <Calendar
              onChange={date =>
                updateForm('apptDate', date.toLocaleDateString('en-US'))
              }
              tileDisabled={(tileData: AnyObject) => {
                const date = tileData.date.toLocaleDateString('en-US')
                const availableDates = availableAppts.map(appt => appt.date)

                return !availableDates.includes(date)
              }}
            />

            <FormField className='form-footer'>
              <Button
                className='mb-button--form uppercase'
                name='next'
                onClick={() => {
                  if (form.apptDate?.length) setFormViewID(1)
                }}
              >
                Next
              </Button>
            </FormField>
          </Container>
        )
      })()}
    </Form>
  )
}

SchedulingForm.defaultProps = {
  scheduleTour: form => {
    console.warn({ SchedulingForm: { '@todo scheduleTour': form } })
  }
}

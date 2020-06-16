import {
  FormSubmissionEvent,
  FormSubmissionEventHandler,
  InitialState
} from 'definitions'
import React from 'react'
import useObject from './useObject'

/**
 * @file Handle forms
 * @module hooks/useForm
 *
 * @todo Update documentation
 */

export type UseFormState = {
  form: InitialState
  onSubmit(event: FormSubmissionEvent): any
  setForm: React.Dispatch<any>
  updateForm(name: string, value: any): any
}

export function useForm(
  initialState?: InitialState,
  handleSubmit?: FormSubmissionEventHandler
): UseFormState {
  const { object, setObject, updateObject } = useObject(initialState)

  return {
    form: object,
    onSubmit: event => {
      event.preventDefault()

      setObject(object)
      return (handleSubmit as FormSubmissionEventHandler)(object, event)
    },
    setForm: setObject,
    updateForm: (name, value) => updateObject(name, value)
  }
}

export default useForm

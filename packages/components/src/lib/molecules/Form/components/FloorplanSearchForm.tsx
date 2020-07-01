import {
  FormSubmissionEvent,
  FormSubmissionEventHandler,
  OptionProps
} from 'declarations'
import { useForm, useMutatedProps } from 'hooks'
import {
  BathroomOptions,
  BedroomOptions,
  Button,
  Container,
  Form,
  FormField,
  FormFieldLayoutConfiguration,
  FormProps,
  MaxPriceOptions,
  MoveInDateOptions
} from 'lib'
import React, { FC } from 'react'

/**
 * @module Components/Molecules/Form/FloorplanSearchForm
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/form}
 */

/**
 * {@link FloorplanSearchForm} initial state.
 */
export type FloorplanSearchFormState = {
  availableDate: string | null
  numberOfBaths: number | string | null
  numberOfBeds: number | string | null
  rentRange: string | null
}

/**
 * {@link FloorplanSearchForm} initial state.
 */
const INITIAL_STATE: FloorplanSearchFormState = {
  availableDate: null,
  numberOfBaths: null,
  numberOfBeds: null,
  rentRange: null
}

export { INITIAL_STATE as FLOORPLANS_SEARCH_FORM_INITIAL_STATE }

/**
 * {@link FloorplanSearchForm} component properties.
 */
export type FloorplanSearchFormProps = FormProps & {
  search?(formState: FloorplanSearchFormState): any
}

/**
 * Renders a `Form` component with the class `mb-form--floorplan-search`.
 */
export const FloorplanSearchForm: FC<FloorplanSearchFormProps> = ({
  search,
  ...rest
}) => {
  const mutatedProps = useMutatedProps(rest, 'mb-form--floorplan-search')

  const { form, updateForm } = useForm(
    INITIAL_STATE,
    (search as unknown) as FormSubmissionEventHandler
  )

  const formFieldLayoutConfig: FormFieldLayoutConfiguration = [
    {
      initialOptions: BedroomOptions,
      name: 'numberOfBeds',
      onChange: (opt: OptionProps) => updateForm('numberOfBeds', opt.value),
      placeholder: 'Bedrooms'
    },
    {
      initialOptions: BathroomOptions,
      name: 'numberOfBaths',
      onChange: (opt: OptionProps) => updateForm('numberOfBaths', opt.value),
      placeholder: 'Bathrooms'
    },
    {
      initialOptions: MaxPriceOptions,
      name: 'rentRange',
      onChange: (opt: OptionProps) => updateForm('rentRange', opt.value),
      placeholder: 'Max Price'
    },
    {
      initialOptions: MoveInDateOptions,
      name: 'availableDate',
      onChange: (opt: OptionProps) => updateForm('availableDate', opt.value),
      placeholder: 'Move In Date'
    }
  ].map(props => ({
    ...props,
    className: 'mb-select--dark',
    isSearchable: false
  }))

  return (
    <Form {...mutatedProps}>
      <Container className='form-container row spread'>
        <FormField
          className='row group select-group'
          layoutConfig={formFieldLayoutConfig}
          name='floorplans_search_filters'
          tagName='select'
        />

        <Button
          className='mb-button--form mb-button--gradient is-full--height no-padding uppercase'
          disabled={!search}
          onClick={(e: FormSubmissionEvent) => {
            e.preventDefault()
            return ((search as unknown) as FormSubmissionEventHandler)(form, e)
          }}
          type='submit'
        >
          Search
        </Button>
      </Container>
    </Form>
  )
}

FloorplanSearchForm.defaultProps = {
  search: form => {
    console.warn({ FloorplanSearchForm: { '@todo search': form } })
  }
}

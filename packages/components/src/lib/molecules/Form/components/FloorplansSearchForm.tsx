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
import '../sass/Form.scss'

/**
 * @module Components/Molecules/Form/FloorplansSearchForm
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/form}
 */

/**
 * {@link FloorplansSearchForm} initial state.
 */
export type FloorplansSearchFormState = {
  availableDate: string | null
  numberOfBaths: string | null
  numberOfBeds: string | null
  rentRange: string | null
}

/**
 * {@link FloorplansSearchForm} initial state.
 */
const INITIAL_STATE: FloorplansSearchFormState = {
  availableDate: null,
  numberOfBaths: null,
  numberOfBeds: null,
  rentRange: null
}

export { INITIAL_STATE as FLOORPLANS_SEARCH_FORM_INITIAL_STATE }

/**
 * {@link FloorplansSearchForm} component properties.
 */
export type FloorplansSearchFormProps = FormProps & {
  searchFloorplans?: FormSubmissionEventHandler
}

/**
 * Renders a {@link Form} component with the class `floorplans-search-form`.
 */
export const FloorplansSearchForm: FC<FloorplansSearchFormProps> = ({
  searchFloorplans,
  ...rest
}) => {
  const mutatedProps = useMutatedProps(rest, 'floorplans-search-form')

  const { form, updateForm } = useForm(INITIAL_STATE, searchFloorplans)

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
  ].map(props => ({ ...props, isSearchable: false }))

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
          className='gradient-bkg uppercase lg'
          disabled={!searchFloorplans}
          onClick={(e: FormSubmissionEvent) => {
            e.preventDefault()
            return (searchFloorplans as FormSubmissionEventHandler)(form, e)
          }}
          type='submit'
        >
          Search
        </Button>
      </Container>
    </Form>
  )
}

FloorplansSearchForm.defaultProps = {
  searchFloorplans: form => {
    console.warn({ FloorplansSearchForm: { '@todo searchFloorplans': form } })
  }
}

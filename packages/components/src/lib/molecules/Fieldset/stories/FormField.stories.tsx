import React, { ReactElement } from 'react'
import {
  BathroomOptions,
  BedroomOptions,
  MaxPriceOptions,
  MoveInDateOptions
} from '../../Select'
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
 * {@link Select} group {@link FormField} story.
 */
export const SelectionGroup = (
  args: FormFieldProps
): ReactElement<FormFieldProps> => <FormField {...args} />

SelectionGroup.args = {
  className: 'row group select-group',
  layoutConfig: [
    {
      initialOptions: MoveInDateOptions,
      name: 'availableDate',
      placeholder: 'Move In Date'
    },
    {
      initialOptions: BathroomOptions,
      name: 'numberOfBaths',
      placeholder: 'Bathrooms'
    },
    {
      initialOptions: BedroomOptions,
      name: 'numberOfBeds',
      placeholder: 'Bedrooms'
    },
    {
      initialOptions: MaxPriceOptions,
      name: 'rentRange',
      placeholder: 'Max Price'
    }
  ].map(props => ({ ...props, isClearable: true, isSearchable: false })),
  tagName: 'select'
}

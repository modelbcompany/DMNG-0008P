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
 * @module lib/Molecules/Fieldset/Components/stories/FormField
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
      initialOptions: BedroomOptions,
      name: 'numberOfBeds',
      placeholder: 'Bedrooms'
    },
    {
      initialOptions: BathroomOptions,
      name: 'numberOfBaths',
      placeholder: 'Bathrooms'
    },
    {
      initialOptions: MaxPriceOptions,
      name: 'rentRange',
      placeholder: 'Max Price'
    },
    {
      initialOptions: MoveInDateOptions,
      name: 'availableDate',
      placeholder: 'Move In Date'
    }
  ].map(props => ({ ...props, isClearable: true, isSearchable: false })),
  tagName: 'select'
}

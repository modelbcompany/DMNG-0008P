import React, { ReactElement } from 'react'
import {
  BathroomOptions,
  BedroomOptions,
  MaxPriceOptions,
  MoveInDateOptions,
  Select,
  SelectProps
} from '../Select'

/**
 * @file Stories - Select
 * @module Stories/Components/Molecules/Select
 */

export default {
  component: Select,
  title: 'Components/Molecules/Select'
}

/**
 * Available date {@link Select} story.
 */
export const AvailableDate = (
  args: SelectProps
): ReactElement<SelectProps> => <Select {...args} />

AvailableDate.args = {
  isClearable: true,
  initialOptions: MoveInDateOptions,
  menuIsOpen: true,
  isSearchable: false,
  name: 'availableDate',
  placeholder: 'Move In Date'
}

/**
 * Number of bathrooms {@link Select} story.
 */
export const NumberOfBathrooms = (
  args: SelectProps
): ReactElement<SelectProps> => <Select {...args} />


NumberOfBathrooms.args = {
  isClearable: true,
  initialOptions: BathroomOptions,
  isSearchable: false,
  name: 'numberOfBaths',
  placeholder: 'Bathrooms'
}

/**
 * Number of bedrooms {@link Select} story.
 */
export const NumberOfBedrooms = (
  args: SelectProps
): ReactElement<SelectProps> => <Select {...args} />

NumberOfBedrooms.args = {
  isClearable: true,
  initialOptions: BedroomOptions,
  isSearchable: false,
  name: 'numberOfBeds',
  placeholder: 'Bedrooms'
}

/**
 * Max price {@link Select} story.
 */
export const RentRange = (
  args: SelectProps
): ReactElement<SelectProps> => <Select {...args} />

RentRange.args = {
  isClearable: true,
  initialOptions: MaxPriceOptions,
  isSearchable: false,
  name: 'rentRange',
  placeholder: 'Max Price'
}

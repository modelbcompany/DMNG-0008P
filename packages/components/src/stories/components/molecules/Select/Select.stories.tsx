import {
  BathroomOptions,
  BedroomOptions,
  MaxPriceOptions,
  MoveInDateOptions,
  Select,
  SelectProps
} from 'lib'
import React, { ReactElement } from 'react'

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
export const Default = (args: SelectProps): ReactElement<SelectProps> => (
  <Select {...args} />
)

Default.args = {}

/**
 * Available date {@link Select} story.
 */
export const AvailableDate = (args: SelectProps): ReactElement<SelectProps> => (
  <Select {...args} />
)

AvailableDate.args = {
  className: 'mb-select--dark',
  initialOptions: MoveInDateOptions,
  isClearable: true,
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
  className: 'mb-select--light',
  initialOptions: BathroomOptions,
  isClearable: true,
  isSearchable: false,
  menuIsOpen: true,
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
  initialOptions: BedroomOptions,
  isClearable: true,
  isSearchable: false,
  name: 'numberOfBeds',
  placeholder: 'Bedrooms'
}

/**
 * Max price {@link Select} story.
 */
export const RentRange = (args: SelectProps): ReactElement<SelectProps> => (
  <Select {...args} />
)

RentRange.args = {
  initialOptions: MaxPriceOptions,
  isClearable: true,
  isSearchable: false,
  name: 'rentRange',
  placeholder: 'Max Price'
}
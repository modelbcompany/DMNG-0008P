import { PropsWithOpts } from 'declarations'
import { useMutatedProps, useOptions } from 'hooks'
import { Input, Placeholder } from 'lib'
import React, { FC } from 'react'
import ReactSelect, { Props as ReactSelectProps } from 'react-select'

/**
 * @module Components/Molecules/Select
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/select}
 */

/**
 * {@link Select} component properties.
 */
export interface SelectProps extends PropsWithOpts<ReactSelectProps> {
  //
}

/**
 * Renders a <div> element with the class `mb-adm-select`.
 */
export const Select: FC<SelectProps> = ({ initialOptions, ...rest }) => {
  const mutatedProps = useMutatedProps(rest, 'mb-adm-select') as SelectProps
  const { options } = useOptions(initialOptions)

  /**
   * NOTICE: `classNamePrefix` is purposely an empty string.
   *
   * React Select classes will begin with "__"
   * ex: <div class="__control css-yk16xz-control"></div>
   *
   * @see {@link https://react-select.com/props}
   */

  mutatedProps.classNamePrefix = ' '
  mutatedProps.components = {
    Input,
    Placeholder
  }
  mutatedProps.options = options

  return <ReactSelect {...mutatedProps} />
}

Select.defaultProps = {
  clearable: true,
  disabled: false,
  initialOptions: [],
  isMulti: false,
  placeholder: 'Please select an option',
  required: false,
  searchable: true
}

/**
 * Bathroom filter options.
 */
export const BathroomOptions = [
  { value: 1 },
  { value: 1.5 },
  { value: 2 },
  { value: 2.5 },
  { value: 3 }
].map(option => ({ ...option, label: option.value }))

/**
 * Bedroom filter options.
 */
export const BedroomOptions = [
  { label: 'Studio', value: 0 },
  { label: '1 BR', value: 1 },
  { label: '2 BR', value: 2 },
  { label: '3 BR', value: 3 }
]

/**
 * Max price filter options.
 */
export const MaxPriceOptions = [
  { label: '<$2k', value: '0-2000' },
  { label: '$2k - $2.5k', value: '2001-2500' },
  { label: '$2.5k - $3k', value: '2501-3000' },
  { label: '$3k - $3.5k', value: '3001-3500' },
  { label: '>$3.5k', value: '3501' }
]

/**
 * Move-in date filter options.
 */
export const MoveInDateOptions = [
  {
    label: 'Janaury',
    value: '01'
  },
  {
    label: 'February',
    value: '02'
  },
  {
    label: 'March',
    value: '03'
  },
  {
    label: 'April',
    value: '04'
  },
  {
    label: 'May',
    value: '05'
  },
  {
    label: 'June',
    value: '06'
  },
  {
    label: 'July',
    value: '07'
  },
  {
    label: 'August',
    value: '08'
  },
  {
    label: 'September',
    value: '09'
  },
  {
    label: 'October',
    value: '10'
  },
  {
    label: 'November',
    value: '11'
  },
  {
    label: 'December',
    value: '12'
  }
].map(option => ({
  ...option,
  value: `${option.value}/${new Date().getFullYear()}`
}))

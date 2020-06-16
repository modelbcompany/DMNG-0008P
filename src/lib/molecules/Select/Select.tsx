import { PropsWithOpts } from 'declarations'
import { useMutatedProps, useOptions } from 'hooks'
import { Input, Placeholder } from 'lib'
import React, { FC } from 'react'
import ReactSelect, { Props as ReactSelectProps } from 'react-select'
import './sass/Select.scss'

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
 * Filter {@link Option} text based on property name.
 *
 * @todo Update documentation
 *
 * @param input - Input text
 * @param option - Option date
 * @param key - Option property name to filter by
 */
export const filterOptions = (input, option, key) =>
  option?.[key].toLowerCase().indexOf(input.toLowerCase()) >= 0

/**
 * Renders a <div> element with the class `adm-select`.
 */
export const Select: FC<SelectProps> = ({ initialOptions, ...rest }) => {
  const mutatedProps = useMutatedProps(rest, 'adm-select') as SelectProps
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

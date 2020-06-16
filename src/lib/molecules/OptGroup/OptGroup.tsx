import { PropsWithOpts } from 'declarations'
import { useMutatedProps, useOptions } from 'hooks'
import { Option } from 'lib'
import React, { FC, OptgroupHTMLAttributes } from 'react'
/**
 * @module Components/Molecules/OptGroup
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/optgroup}
 */

/**
 * {@link OptGroup} component properties.
 */
export type OptGroupProps = PropsWithOpts<
  OptgroupHTMLAttributes<HTMLOptionElement>
>

/**
 * Renders a <optgroup> element with the class `adm-optgroup`.
 *
 * @param props - Component data
 */
export const OptGroup: FC<OptGroupProps> = ({ initialOptions, ...rest }) => {
  const mutatedProps = useMutatedProps(rest, 'adm-optgroup') as OptGroupProps
  const { options } = useOptions(initialOptions)

  return (
    <optgroup {...mutatedProps}>
      {options.map(option => (
        <Option {...option} key={option.label} />
      ))}
    </optgroup>
  )
}

OptGroup.defaultProps = {
  disabled: false,
  label: 'Options',
  initialOptions: [
    {
      label: 'Option 1',
      value: 1
    },
    {
      label: 'Option 2',
      value: 2
    },
    {
      label: 'Option 3',
      value: 3
    },
    {
      label: 'Option 4',
      value: 4
    }
  ]
}

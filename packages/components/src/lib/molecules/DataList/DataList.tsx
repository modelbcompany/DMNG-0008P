import { PropsWithOpts } from 'declarations'
import { useMutatedProps, useOptions } from 'hooks'
import { OptGroup, Option } from 'lib'
import React, { FC, HTMLAttributes } from 'react'

/**
 * @module Components/Molecules/Datalist
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/datalist}
 */

/**
 * {@link DataList} component properties.
 */
export type DataListProps = PropsWithOpts<HTMLAttributes<HTMLDataListElement>>

/**
 * Renders a `<datalist>` element with the class `adm-datalist`.
 *
 * @param props - Component data
 */
export const DataList: FC<DataListProps> = ({
  groupOptions,
  initialOptions,
  ...rest
}) => {
  const mutatedProps = useMutatedProps(rest, 'adm-datalist')
  const { options } = useOptions(initialOptions)

  return (
    <datalist {...mutatedProps}>
      {options.map(option => {
        if (groupOptions) return <OptGroup {...option} />
        return <Option {...option} key={option.label} />
      })}
    </datalist>
  )
}

DataList.defaultProps = {
  groupOptions: false,
  initialOptions: []
}

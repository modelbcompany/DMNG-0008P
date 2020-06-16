import { Props } from 'definitions'
import { useMutatedProps } from 'hooks'
import React, { FC, HTMLAttributes } from 'react'
import './sass/TableBody.scss'

/**
 * @module Components/Organisms/TableBody
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/tbody}
 */

/**
 * {@link TableBody} component properties.
 */
export type TableBodyProps = Props<HTMLAttributes<HTMLTableSectionElement>>

/**
 * Renders a `<tbody>` element with the class `adm-tbody`.
 *
 * @param props - Component data
 */
export const TableBody: FC<TableBodyProps> = ({ children, ...props }) => (
  <tbody {...useMutatedProps(props, 'adm-tbody')}>{children}</tbody>
)

TableBody.defaultProps = {
  children: []
}

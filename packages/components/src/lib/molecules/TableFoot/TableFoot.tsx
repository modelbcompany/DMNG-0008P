import { Props } from 'declarations'
import { useMutatedProps } from 'hooks'
import { TableRow, TableRowProps } from 'lib'
import React, { FC, HTMLAttributes } from 'react'
import './sass/TableFoot.scss'

/**
 * @module Components/Molecules/TableFoot
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/tfoot}
 */

/**
 * {@link TableRow} component properties.
 */
export type TableFootProps = Props<HTMLAttributes<HTMLTableSectionElement>> & {
  row?: TableRowProps
}

/**
 * Renders a `<tfoot>` element with the class `adm-tfoot`.
 *
 * @param props - Component data
 */
export const TableFoot: FC<TableFootProps> = ({ row, ...rest }) => (
  <tfoot {...useMutatedProps(rest, 'adm-tfoot')}>
    <TableRow {...(row as TableRowProps)} />
  </tfoot>
)

TableFoot.defaultProps = {
  row: { dataContent: [] } as TableRowProps
}

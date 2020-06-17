import { Props } from 'declarations'
import { useMutatedProps } from 'hooks'
import { TableRow, TableRowProps } from 'lib'
import React, { FC, HTMLAttributes } from 'react'
import './sass/TableHead.scss'

/**
 * @module Components/Molecules/TableHead
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/thead}
 */

/**
 * {@link TableHead} component properties.
 */
export type TableHeadProps = Props<HTMLAttributes<HTMLTableSectionElement>> & {
  row?: TableRowProps
}

/**
 * Renders a `<thead>` element with the class `adm-thead`.
 *
 * @param props - Component data
 */
export const TableHead: FC<TableHeadProps> = ({ row, ...rest }) => (
  <thead {...useMutatedProps(rest, 'adm-thead')}>
    <TableRow {...(row as TableRowProps)} headersOnly />
  </thead>
)

TableHead.defaultProps = {
  row: { dataContent: [] }
}

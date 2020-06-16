import { TableRow, TableRowProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - TableRow
 * @module Stories/Components/Molecules/TableRow
 */

export default {
  component: TableRow,
  title: 'Components/Molecules/TableRow'
}

/**
 * Default {@link TableRow} story.
 */
export const Default = (args: TableRowProps): ReactElement<TableRowProps> => (
  <TableRow dataContent={[]} />
)

Default.args = {
  dataContent: []
}

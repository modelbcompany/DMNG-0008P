import { Table, TableProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - Table
 * @module Stories/Components/Organisms/Table
 */

export default {
  component: Table,
  title: 'Components/Organisms/Table'
}

/**
 * Default {@link Table} story.
 */
export const Default = (): ReactElement<TableProps> => <Table />

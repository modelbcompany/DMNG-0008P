import { TableHead, TableHeadProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - TableHead
 * @module Stories/Components/Molecules/TableHead
 */

export default {
  component: TableHead,
  title: 'Components/Molecules/TableHead'
}

/**
 * Default {@link TableHead} story.
 */
export const Default = (): ReactElement<TableHeadProps> => <TableHead />

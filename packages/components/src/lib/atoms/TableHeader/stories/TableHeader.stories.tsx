import { TableHeader, TableHeaderProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - TableHeader
 * @module Stories/Components/Atoms/TableHeader/stories/TableHeader
 */

export default {
  component: TableHeader,
  title: 'Components/Atoms/TableHeader'
}

/**
 * Default {@link TableHeader} story.
 */
export const Default = (): ReactElement<TableHeaderProps> => <TableHeader />

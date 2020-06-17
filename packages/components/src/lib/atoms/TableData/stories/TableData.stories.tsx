import { text } from '@storybook/addon-knobs'
import { TableData, TableDataProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - TableData
 * @module Stories/Components/Atoms/TableData
 */

export default {
  component: TableData,
  title: 'Components/Atoms/TableData'
}

/**
 * Default {@link TableData} story.
 */
export const Default = (): ReactElement<TableDataProps> => <TableData />

/**
 * {@link TableData} component displayed as a {@link Link} component.
 */
export const TableDataLink = (): ReactElement<TableDataProps> => (
  <TableData href={text('href', '#')}>
    {text('children', 'Table data link')}
  </TableData>
)

TableDataLink.storyName = 'Link'

/**
 * {@link TableData} component displayed as a {@link Paragraph} component.
 */
export const TableDataText = (): ReactElement<TableDataProps> => (
  <TableData>{text('children', 'Table data text')}</TableData>
)

TableDataText.storyName = 'Text'

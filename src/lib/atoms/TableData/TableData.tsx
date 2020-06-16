import { Container } from 'lib'
import { PropsWithContainer } from 'definitions'
import { useMutatedProps } from 'hooks'
import _ from 'lodash'
import React, { FC, HTMLAttributes } from 'react'
import './sass/TableData.scss'

/**
 * @module Components/Atoms/TableData
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/td}
 */

/**
 * React `<td>` properties.
 */
export type ReactTableDataProps = HTMLAttributes<HTMLTableDataCellElement>

/**
 * {@link TableData} component properties.
 */
export interface TableDataProps extends PropsWithContainer {
  /**
   * The URL that the hyperlink points to.
   * This value will be used if `role='link'`.
   */
  href?: string
}

/**
 * Renders a `<td>` element with the class `ada-td`.
 *
 * **https://developer.mozilla.org/docs/Web/HTML/Element/td**
 */
export const TableData: FC<TableDataProps> = ({
  container,
  ...rest
}: TableDataProps) => {
  const mutatedProps = useMutatedProps(rest, 'ada-td')

  if (!container) return <td {...(mutatedProps as ReactTableDataProps)} />

  return (
    <td {..._.omit(mutatedProps, 'children')}>
      <Container className='td-container'>
        {_.pick(mutatedProps, 'children')}
      </Container>
    </td>
  )
}

TableData.defaultProps = {}

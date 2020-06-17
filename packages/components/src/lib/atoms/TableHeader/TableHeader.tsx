import { PropsWithContainer } from 'declarations'
import { useMutatedProps } from 'hooks'
import { Container } from 'lib'
import _ from 'lodash'
import React, { FC, HTMLAttributes } from 'react'
import './sass/TableHeader.scss'

/**
 * @module Components/Atoms/TableHeader
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/th}
 */

/**
 * React `<th>` properties.
 */
export type ReactTableHeaderProps = HTMLAttributes<HTMLTableHeaderCellElement>

/**
 * {@link TableHeader} component properties.
 */
export interface TableHeaderProps extends PropsWithContainer {
  /**
   * The URL that the hyperlink points to.
   * This value will be used if `role='link'`.
   */
  href?: string
}

/**
 * Renders a `<th>` element with the class `ada-th`.
 *
 * **https://developer.mozilla.org/docs/Web/HTML/Element/th**
 */
export const TableHeader: FC<TableHeaderProps> = ({
  container,
  ...rest
}: TableHeaderProps) => {
  const mutatedProps = useMutatedProps(rest, 'ada-th')

  if (!container) return <th {...(mutatedProps as ReactTableHeaderProps)} />

  return (
    <th {..._.omit(mutatedProps, 'children')}>
      <Container className='th-container'>
        {_.pick(mutatedProps, 'children')}
      </Container>
    </th>
  )
}

TableHeader.defaultProps = {}

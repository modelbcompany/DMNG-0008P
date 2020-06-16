import {
  Container,
  TableData,
  TableDataProps,
  TableHeader,
  TableHeaderProps
} from 'lib'
import { PropsWithContainer } from 'definitions'
import { useMutatedProps } from 'hooks'
import _ from 'lodash'
import React, { FC } from 'react'
import './sass/TableRow.scss'

/**
 * @module Components/Organisms/TableRow
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/tr}
 */

/**
 * {@link TableRow} component properties.
 */
export type TableRowProps = PropsWithContainer & {
  headersOnly?: boolean
  dataContent?: Record<string, unknown>[]
}

/**
 * Table row content.
 */
export type TableRowContent = TableDataProps | TableHeaderProps

/**
 * Renders a `<tr>` element with the class `adm-tr`.
 *
 * **https://developer.mozilla.org/docs/Web/HTML/Element/tr**
 */
export const TableRow: FC<TableRowProps> = ({
  container,
  dataContent: data,
  headersOnly,
  ...rest
}) => {
  const mutatedProps = useMutatedProps(rest, 'adm-tr')

  mutatedProps.children = (data as Record<string, unknown>[]).map(
    (props: TableRowContent, i: number) => {
      const key = props?.id || props['data-key'] || `tr-content-${i}`

      let component: React.ReactNode

      if (headersOnly) {
        component = <TableHeader {...props} key={key} />
      } else {
        if (i === 0) {
          component = <TableHeader {...(props as TableHeaderProps)} />
        } else {
          component = <TableData {...props} key={key} />
        }
      }

      return component
    }
  )

  if (!container) return <tr {...mutatedProps} />

  return (
    <tr {..._.omit(mutatedProps, 'children')}>
      <Container className='tr-container'>
        {_.pick(mutatedProps, 'children')}
      </Container>
    </tr>
  )
}

TableRow.defaultProps = {
  container: false,
  dataContent: []
}

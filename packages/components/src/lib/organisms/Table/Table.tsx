import { PropsWithContainer } from 'declarations'
import { useMutatedProps } from 'hooks'
import { Container } from 'lib'
import _ from 'lodash'
import React, { FC } from 'react'
import './sass/Table.scss'

/**
 * @module Components/Organisms/Table
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/table}
 */

/**
 * {@link Table} component properties.
 */
export type TableProps = PropsWithContainer

/**
 * Renders an `<table>` element with the class `ado-table`.
 *
 * @param props - Component data
 */
export const Table: FC<TableProps> = ({ container, ...rest }) => {
  const mutatedProps = useMutatedProps(rest, 'ado-table')

  if (!container) return <table {...mutatedProps} />

  return (
    <table {..._.omit(mutatedProps, 'children')}>
      <Container className='table-container'>
        {_.pick(mutatedProps, 'children')}
      </Container>
    </table>
  )
}

Table.defaultProps = {
  container: false
}

import { PropsWithContainer } from 'declarations'
import { useMutatedProps } from 'hooks'
import _ from 'lodash'
import React, { FC, HTMLAttributes } from 'react'
import { Container } from '../../molecules'
import './sass/Aside.scss'

/**
 * @module Components/Organisms/Aside
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/aside}
 */

/**
 * {@link Article} component properties.
 */
export type AsideProps = PropsWithContainer<HTMLAttributes<HTMLElement>>

/**
 * Renders an `<aside>` element with the class `ado-aside`.
 *
 * @param props - Component data
 */
export const Aside: FC<AsideProps> = ({ container, ...rest }) => {
  const mutatedProps = useMutatedProps(rest, 'ado-aside')

  if (!container) return <aside {...mutatedProps} />

  return (
    <aside {..._.omit(mutatedProps, 'children')}>
      <Container className='aside-container'>
        {_.pick(mutatedProps, 'children')}
      </Container>
    </aside>
  )
}

Aside.defaultProps = {
  container: false
}

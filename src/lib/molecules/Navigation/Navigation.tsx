import { PropsWithContainer } from 'declarations'
import { useMutatedProps } from 'hooks'
import { Container } from 'lib'
import _ from 'lodash'
import React, { FC, HTMLAttributes } from 'react'
import './sass/Navigation.scss'

/**
 * @module Components/Organisms/Navigation
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/nav}
 */

/**
 * {@link Navigation} component properties.
 */
export type NavigationProps = PropsWithContainer<HTMLAttributes<HTMLElement>>

/**
 * Renders a `<nav>` element with the class `adm-nav`.
 *
 * @param props - Component data
 */
export const Navigation: FC<NavigationProps> = ({ container, ...rest }) => {
  const mutatedProps = useMutatedProps(rest, 'adm-nav')

  if (!container) return <div {...mutatedProps} />

  return (
    <nav {..._.omit(mutatedProps, 'children')}>
      <Container className='nav-container'>
        {_.pick(mutatedProps, 'children')}
      </Container>
    </nav>
  )
}

Navigation.defaultProps = {
  container: false
}

import { PropsWithContainer } from 'declarations'
import { useMutatedProps } from 'hooks'
import { Container } from 'lib'
import _ from 'lodash'
import React, { FC, HTMLAttributes } from 'react'
import './sass/Header.scss'

/**
 * @module Components/Organisms/Header
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/header}
 */

/**
 * {@link Header} component properties.
 */
export type HeaderProps = PropsWithContainer<HTMLAttributes<HTMLElement>>

/**
 * Renders an `<header>` element with the class `ado-header`.
 *
 * @param props - Component data
 */
export const Header: FC<HeaderProps> = ({ container, ...rest }) => {
  const mutatedProps = useMutatedProps(rest, 'ado-header')

  if (!container) return <header {...mutatedProps} />

  return (
    <header {..._.omit(mutatedProps, 'children')}>
      <Container className='header-container'>
        {_.pick(mutatedProps, 'children')}
      </Container>
    </header>
  )
}

Header.defaultProps = {
  container: false
}

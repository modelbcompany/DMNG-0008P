import { PropsWithContainer } from 'declarations'
import { useMutatedProps } from 'hooks'
import { Container } from 'lib'
import _ from 'lodash'
import React, { FC, HTMLAttributes } from 'react'
import './sass/Main.scss'

/**
 * @module Components/Organisms/Main
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/main}
 */

/**
 * {@link Main} component properties.
 */
export type MainProps = PropsWithContainer<HTMLAttributes<HTMLElement>>

/**
 * Renders an `<main>` element with the class `ado-main`.
 *
 * @param props - Component data
 */
export const Main: FC<MainProps> = ({ container, ...rest }) => {
  const mutatedProps = useMutatedProps(rest, 'ado-main')

  if (!container) return <main {...mutatedProps} />

  return (
    <main {..._.omit(mutatedProps, 'children')}>
      <Container className='main-container'>
        {_.pick(mutatedProps, 'children')}
      </Container>
    </main>
  )
}

Main.defaultProps = {
  container: false
}

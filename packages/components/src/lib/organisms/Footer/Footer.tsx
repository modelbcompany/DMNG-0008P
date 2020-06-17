import { PropsWithContainer } from 'declarations'
import { useMutatedProps } from 'hooks'
import { Container } from 'lib'
import _ from 'lodash'
import React, { FC, HTMLAttributes } from 'react'
import './sass/Footer.scss'

/**
 * @module Components/Organisms/Footer
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/footer}
 */

/**
 * {@link Footer} component properties.
 */
export type FooterProps = PropsWithContainer<HTMLAttributes<HTMLElement>>

/**
 * Renders an `<footer>` element with the class `ado-footer`.
 *
 * @param props - Component data
 */
export const Footer: FC<FooterProps> = ({ container, ...rest }) => {
  const mutatedProps = useMutatedProps(rest, 'ado-footer')

  if (!container) return <footer {...mutatedProps} />

  return (
    <footer {..._.omit(mutatedProps, 'children')}>
      <Container className='footer-container'>
        {_.pick(mutatedProps, 'children')}
      </Container>
    </footer>
  )
}

Footer.defaultProps = {
  container: false
}

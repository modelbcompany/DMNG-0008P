import { Container } from 'lib'
import { PropsWithContainer } from 'definitions'
import { useMutatedProps } from 'hooks'
import _ from 'lodash'
import React, { FC, HTMLAttributes } from 'react'
import './sass/Section.scss'

/**
 * @module Components/Organisms/Section
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/section}
 */

/**
 * {@link Section} component properties.
 */
export type SectionProps = PropsWithContainer<HTMLAttributes<HTMLElement>>

/**
 * Renders an `<section>` element with the class `ado-section`.
 *
 * @param props - Component data
 */
export const Section: FC<SectionProps> = ({ container, ...rest }) => {
  const mutatedProps = useMutatedProps(rest, 'ado-section')

  if (!container) return <section {...mutatedProps} />

  return (
    <section {..._.omit(mutatedProps, 'children')}>
      <Container className='section-container'>
        {_.pick(mutatedProps, 'children')}
      </Container>
    </section>
  )
}

Section.defaultProps = {
  container: false
}

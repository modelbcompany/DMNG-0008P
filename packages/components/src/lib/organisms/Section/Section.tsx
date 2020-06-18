import { AnyObject, ApartmentWithPlan, PropsWithContainer } from 'declarations'
import { useMutatedProps } from 'hooks'
import { Container, Floorplan, Heading, Icon } from 'lib'
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
 * {@link FloorplansGrid} component properties.
 */
export interface FloorplansGridProps extends SectionProps {
  /**
   * Merged `RentCafeApartment` and `RentCafeFloorplan` data.
   *
   * @default []
   */
  apartments?: ApartmentWithPlan[]

  /**
   * Error from API call.
   *
   * @default null
   */
  error?: AnyObject | null

  /**
   * `Section` `Heading` text.
   *
   * @default 'One Bedroom'
   */
  title?: string
}

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

/**
 * Renders a `Section` component with the class `floorplans-grid`.
 *
 * @param props - Component data
 */
export const FloorplansGrid: FC<FloorplansGridProps> = ({
  apartments: apts = [],
  error,
  ...rest
}) => {
  const { title } = rest
  const mutatedProps = useMutatedProps(rest, 'floorplans-grid')

  const container_style = `${apts.length === 0 ? 'display-flex' : ''}`

  if (error) return null

  return (
    <Section {...mutatedProps}>
      <Heading className='uppercase floorplans-grid-title' size={2}>
        {title}
      </Heading>

      <Container className={`floorplans-grid-container ${container_style}`}>
        {(() => {
          if (apts.length === 0) return <Icon className='fa-spinner fa-spin' />

          return apts.map((apt: ApartmentWithPlan) => (
            <Floorplan aptWithPlan={apt} key={`apt_${apt.ApartmentName}`} />
          ))
        })()}
      </Container>
    </Section>
  )
}

Section.defaultProps = {
  container: false
}

FloorplansGrid.defaultProps = {
  apartments: [],
  error: null,
  title: 'One Bedroom'
}

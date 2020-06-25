import { FeathersErrorJSON } from '@feathersjs/errors'
import { ApartmentWithPlan, PropsWithContainer } from 'declarations'
import { useMutatedProps } from 'hooks'
import { Container, Floorplan, Heading } from 'lib'
import _ from 'lodash'
import React, { FC, HTMLAttributes, useEffect, useState } from 'react'

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
   * Error from API call.
   */
  apiError?: FeathersErrorJSON

  /**
   * Merged `RentCafeApartment` and `RentCafeFloorplan` data.
   *
   * @default []
   */
  gridData?: ApartmentWithPlan[]

  /**
   * `Section` `Heading` text.
   *
   * @default 'Floorplans'
   */
  gridTitle?: string
}

/**
 * Renders an `<section>` element with the class `mb-ado-section`.
 *
 * @param props - Component data
 */
export const Section: FC<SectionProps> = ({ container, ...rest }) => {
  const mutatedProps = useMutatedProps(rest, 'mb-ado-section')

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
  gridData = [],
  gridTitle,
  ...rest
}) => {
  const [plans, setPlans] = useState([] as JSX.Element[])

  useEffect(() => {
    const renderedFloorplans = gridData.map((apt: ApartmentWithPlan) => (
      <Floorplan aptWithPlan={apt} key={`apt_${apt.ApartmentName}`} />
    ))

    setPlans([...renderedFloorplans])
  }, [gridData])

  return (
    <Section {...useMutatedProps(rest, 'floorplans-grid', ['apiError'])}>
      <Heading className='uppercase floorplans-grid-title' size={3}>
        {gridTitle}
      </Heading>

      <Container className='floorplans-grid-container'>{plans}</Container>
    </Section>
  )
}

Section.defaultProps = {
  container: false
}

FloorplansGrid.defaultProps = {
  apiError: {} as FeathersErrorJSON,
  gridData: [],
  gridTitle: 'Floorplans'
}

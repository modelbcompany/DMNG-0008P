import React, { ReactElement } from 'react'
import { FloorplansGrid, FloorplansGridProps } from '../Section'
import ApartmentsWithPlansMock from '../__mocks__/ApartmentsWithPlans.mock'

/**
 * @file Stories - FloorplansGrid
 * @module lib/Organisms/Section/stories/FloorplansGrid
 */

export default {
  component: FloorplansGrid,
  title: 'Components/Organisms/Section/Components/FloorplansGrid'
}

/**
 * Default {@link FloorplansGrid} story.
 */
export const Default = (
  args: FloorplansGridProps
): ReactElement<FloorplansGridProps> => <FloorplansGrid {...args} />

Default.args = {}

/**
 * {@link FloorplansGrid} with data.
 */
export const WithData = (
  args: FloorplansGridProps
): ReactElement<FloorplansGridProps> => <FloorplansGrid {...args} />

WithData.args = {
  apartments: ApartmentsWithPlansMock
}

import { FloorplansGrid, FloorplansGridProps } from 'lib'
import React, { ReactElement } from 'react'
import ApartmentsWithPlansMock from './__mocks__/ApartmentsWithPlans.mock'

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

Default.args = {
  gridData: []
}

/**
 * {@link FloorplansGrid} story with API data populating the grid.
 */
export const WithAPIData = (
  args: FloorplansGridProps
): ReactElement<FloorplansGridProps> => <FloorplansGrid {...args} />

WithAPIData.args = {
  gridData: ApartmentsWithPlansMock
}

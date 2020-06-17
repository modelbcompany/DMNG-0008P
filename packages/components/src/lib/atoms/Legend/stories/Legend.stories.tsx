import React, { ReactElement } from 'react'
import { Legend, LegendProps } from '../Legend'

/**
 * @file Stories - Legend
 * @module Stories/Components/Atoms/Legend
 */

export default {
  component: Legend,
  title: 'Components/Atoms/Legend'
}

/**
 * Default {@link Legend} story.
 */
export const Default = (): ReactElement<LegendProps> => <Legend />

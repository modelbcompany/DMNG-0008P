import React, { ReactElement } from 'react'
import {
  FloorplansTemplate,
  FloorplansTemplateProps
} from '../FloorplansTemplate'

/**
 * @file Stories - FloorplansTemplate
 * @module Stories/Components/Templates/FloorplansTemplate
 */

export default {
  component: FloorplansTemplate,
  title: 'Components/Templates/FloorplansTemplate'
}

/**
 * Default {@link FloorplansTemplate} story.
 */
export const Default = (): ReactElement<FloorplansTemplateProps> => (
  <FloorplansTemplate />
)

import {
  FloorplansTemplate,
  FloorplansTemplateProps
} from 'lib'
import React, { ReactElement } from 'react'

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

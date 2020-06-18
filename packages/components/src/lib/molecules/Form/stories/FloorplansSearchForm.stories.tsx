import React, { ReactElement } from 'react'
import { FloorplansSearchForm, FloorplansSearchFormProps } from '../components'

/**
 * @file Stories - FloorplansSearchForm
 * @module Stories/Components/Molecules/Form/FloorplansSearchForm
 */

export default {
  component: FloorplansSearchForm,
  title: 'Components/Molecules/Form/Components/FloorplansSearchForm'
}

/**
 * Default {@link FloorplansSearchForm} story.
 */
export const Default = (
  args: FloorplansSearchFormProps
): ReactElement<FloorplansSearchFormProps> => <FloorplansSearchForm {...args} />

Default.args = {}

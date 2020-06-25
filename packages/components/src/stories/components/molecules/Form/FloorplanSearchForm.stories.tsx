import { FloorplanSearchForm, FloorplanSearchFormProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - FloorplanSearchForm
 * @module lib/Molecules/Form/stories/FloorplanSearchForm
 */

export default {
  component: FloorplanSearchForm,
  title: 'Components/Molecules/Form/Components/FloorplanSearchForm'
}

/**
 * Default {@link FloorplanSearchForm} story.
 */
export const Default = (
  args: FloorplanSearchFormProps
): ReactElement<FloorplanSearchFormProps> => <FloorplanSearchForm {...args} />

Default.args = {}

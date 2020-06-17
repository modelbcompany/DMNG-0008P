import { Select, SelectProps } from 'lib'
import React, { ReactElement } from 'react'
import { RecordLimitsMock } from '../__mocks__/Options.mock'

/**
 * @file Stories - Select
 * @module Stories/Components/Molecules/Select
 */

export default {
  component: Select,
  title: 'Components/Molecules/Select'
}

/**
 * Default {@link Select} story.
 */
export const Default = (args: SelectProps): ReactElement<SelectProps> => (
  <Select {...args} />
)

Default.args = {}

/**
 * Story displaying records limit options.
 */
export const RecordsLimit = (args: SelectProps): ReactElement<SelectProps> => (
  <Select {...args} />
)

RecordsLimit.args = {
  defaultValue: 25,
  initialOptions: RecordLimitsMock
}

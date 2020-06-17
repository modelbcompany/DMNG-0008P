import { DataList, DataListProps } from 'lib'
import React, { ReactElement } from 'react'
import OptionsMock from '../__mocks__/Options.mock'

/**
 * @file Stories - DataList
 * @module Stories/Components/Molecules/DataList
 */

export default {
  component: DataList,
  title: 'Components/Molecules/DataList'
}

/**
 * Default {@link DataList} story.
 */
export const Default = (args: DataListProps): ReactElement<DataListProps> => (
  <DataList {...args} initialOptions={OptionsMock} />
)

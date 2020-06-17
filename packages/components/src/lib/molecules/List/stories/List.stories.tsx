import React, { ReactElement } from 'react'
import { List, ListProps } from '../List'
import { DropdownListMock, ListMock } from '../__mocks__/List.mock'

/**
 * @file Stories - List
 * @module Stories/Components/Molecules/List
 */

export default {
  component: List,
  title: 'Components/Molecules/List'
}

/**
 * Default {@link List} story.
 */
export const Default = (args: ListProps): ReactElement<ListProps> => (
  <List {...args} initialItems={ListMock} />
)

/**
 * Dropdown {@link List} story.
 */
export const DropdownList = (args: ListProps): ReactElement<ListProps> => (
  <List
    {...args}
    className='dropdown-list'
    data-controlled
    data-expanded
    initialItems={DropdownListMock}
  />
)

DropdownList.storyName = 'Dropdown'
DropdownList.parameters = {}

import { Item, ItemProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - Item
 * @module Stories/Components/Molecules/Item
 */

export default {
  component: Item,
  title: 'Components/Molecules/Item'
}

/**
 * Default {@link Item} story.
 */
export const Default = (args: ItemProps): ReactElement<ItemProps> => (
  <Item {...args} />
)

/**
 * {@link Dropdown @link List @link Item} story.
 */
export const DropdownListItem = (args: ItemProps): ReactElement<ItemProps> => (
  <Item {...args} className='dropdown-item' />
)

DropdownListItem.storyName = 'Dropdown List'
DropdownListItem.parameters = {}

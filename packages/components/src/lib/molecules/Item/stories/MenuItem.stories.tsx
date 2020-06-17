import React, { ReactElement } from 'react'
import { MenuItem, MenuItemProps } from '../Item'

/**
 * @file Stories - MenuItem
 * @module Stories/Components/Molecules/Item/MenuItem
 */

export default {
  component: MenuItem,
  title: 'Components/Molecules/Item/Components/MenuItem'
}

/**
 * Default {@link MenuItem} story.
 */
export const Default = (args: MenuItemProps): ReactElement<MenuItemProps> => (
  <MenuItem {...args} />
)

/**
 * Button style {@link MenuItem} story.
 */
export const MenuAction = (
  args: MenuItemProps
): ReactElement<MenuItemProps> => {
  return (
    <MenuItem {...args} role='button'>
      Menu action
    </MenuItem>
  )
}

MenuAction.storyName = 'Action'
MenuAction.parameters = {}

/**
 * {@link Dropdown} {@link MenuItem} story.
 */
export const DropdownMenuItem = (
  args: MenuItemProps
): ReactElement<MenuItemProps> => {
  return (
    <MenuItem {...args} className='dropdown-menu-item'>
      Dropdown menu item
    </MenuItem>
  )
}

DropdownMenuItem.storyName = 'Dropdown Menu'
DropdownMenuItem.parameters = {}

/**
 * Link style {@link MenuItem} story.
 */
export const MenuLink = (args: MenuItemProps): ReactElement<MenuItemProps> => (
  <MenuItem {...args} role='link'>
    Menu link
  </MenuItem>
)

MenuLink.storyName = 'Link'
MenuLink.parameters = {}

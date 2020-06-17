import React, { ReactElement } from 'react'
import { Menu, MenuProps } from '../List'
import {
  DropdownMenuMock,
  MenuMock,
  SocialMenuMock
} from '../__mocks__/Menu.mock'

/**
 * @file Stories - Menu
 * @module Stories/Components/Molecules/List/Menu
 */

export default {
  component: Menu,
  title: 'Components/Molecules/List/Components/Menu'
}

/**
 * Default {@link Menu} story.
 */
export const Default = (args: MenuProps): ReactElement<MenuProps> => (
  <Menu {...args} />
)

Default.args = {
  initialItems: MenuMock
}

/**
 * {@link Details} {@link Menu} story.
 */
export const DetailsMenu = (args: MenuProps): ReactElement<MenuProps> => (
  <Menu {...args} />
)

DetailsMenu.storyName = 'Details'
DetailsMenu.args = {
  initialItems: DropdownMenuMock
}

/**
 * Social media {@link Menu} story.
 */
export const SocialMediaMenu = (args: MenuProps): ReactElement<MenuProps> => (
  <Menu {...args} />
)

SocialMediaMenu.storyName = 'Social Media'
SocialMediaMenu.args = {
  initialItems: SocialMenuMock
}

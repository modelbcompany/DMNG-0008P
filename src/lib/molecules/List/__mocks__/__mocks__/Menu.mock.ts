/**
 * @file Mock Menu Data
 * @module Stories/Components/Molecules/List/mocks/Menu
 */

export const MenuMock = Object.freeze(
  [
    {
      children: 'Menu item 1'
    },
    {
      children: 'Menu item 2'
    },
    {
      children: 'Menu item 3'
    },
    {
      children: 'Menu item 4'
    },
    {
      children: 'Menu item 5'
    }
  ].map(item => Object.assign({ href: '#' }, item))
)

export const DropdownMenuMock = Object.freeze(
  MenuMock.map((item, i) => ({
    ...item,
    children: `Dropdown menu item ${i}`,
    className: 'dropdown-menu-item'
  }))
)

export const SocialMenuMock = [
  {
    icon: { 'aria-label': 'Instagram', className: 'fab fa-instagram' },
    href: '#instagram'
  },
  {
    icon: { 'aria-label': 'Twitter', className: 'fab fa-twitter' },
    href: '#twitter'
  },
  {
    icon: { 'aria-label': 'Facebook', className: 'fab fa-facebook' },
    href: '#facebook'
  },
  {
    icon: { 'aria-label': 'LinkedIn', className: 'fab fa-linkedin' },
    href: '#linkedin'
  }
]

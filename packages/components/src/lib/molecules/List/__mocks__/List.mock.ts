/**
 * @file Mock Data - Lists
 * @module Stories/Components/Molecules/List/mocks/List
 */

export const ListMock = [
  {
    children: 'List item 1'
  },
  {
    children: 'List item 2'
  },
  {
    children: 'List item 3'
  },
  {
    children: 'List item 4'
  },
  {
    children: 'List item 5'
  }
]

export const DropdownListMock = ListMock.map(props => ({
  children: `${props.children.replace('List ', 'Dropdown list ')}`,
  className: 'dropdown-item'
}))

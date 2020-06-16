import { Item, ItemProps, ItemTypes, MenuItem } from 'lib'
import { Props } from 'definitions'
import { MenuConfiguration, useMenuItems, useMutatedProps } from 'hooks'
import React, { FC, HTMLAttributes, OlHTMLAttributes } from 'react'
import './sass/List.scss'

/**
 * @module Components/Molecules/List
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/ol}
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/ul}
 */

/**
 * {@link List} component properties.
 */
export type ListProps = {
  initialItems?: ItemProps[]
  itemType?: string
  listType?: string
} & Props<OlHTMLAttributes<HTMLOListElement>> &
  Props<HTMLAttributes<HTMLUListElement>>

/**
 * {@link Menu} component properties.
 */
export type MenuProps = {
  config?: MenuConfiguration
} & ListProps

/**
 * Renders a `<ol>` or `<ul>` element with the class `adm-list`.
 *
 * @todo Handle description list
 * @todo Update inner function documentation
 *
 * @param props - Component data
 */
export const List: FC<ListProps> = ({
  initialItems,
  itemType,
  listType,
  ...rest
}) => {
  const mutatedProps = useMutatedProps(rest, 'adm-list') as ListProps

  mutatedProps.children = (() => {
    if (rest.children) return rest.children

    return (initialItems as ItemProps[]).map((props, i) => {
      const key = props['data-key'] || props.id || `item-${i}`
      let component: React.ReactElement

      switch (Object.values(ItemTypes).find(id => id === itemType)) {
        case ItemTypes.Menu:
          component = <MenuItem {...props} key={key} />
          break
        default:
          component = <Item {...props} key={key} />
      }

      return component
    })
  })()

  switch (listType) {
    case 'ordered':
      return <ol {...mutatedProps} />
    default:
      return <ul {...mutatedProps} />
  }
}

/**
 * Renders a {@link List} component with the class `menu`.
 *
 * @param props - Component data
 */
export const Menu: FC<MenuProps> = ({ config, initialItems, ...rest }) => {
  const mutatedProps = useMutatedProps(rest, 'menu') as MenuProps
  const { items } = useMenuItems(initialItems || [], config || {})

  return (
    <List {...mutatedProps} initialItems={items} itemType={ItemTypes.Menu} />
  )
}

List.defaultProps = {
  initialItems: [],
  listType: 'unordered'
}

Menu.defaultProps = {
  config: { sub: [], top: [] }
}

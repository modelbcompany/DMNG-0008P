import { useDisclosure, useMutatedProps } from 'hooks'
import React, { FC, LiHTMLAttributes } from 'react'
import { MenuProps } from '../List/List'
import './sass/Item.scss'

/**
 * @module Components/Molecules/Item
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/li}
 */

/**
 * React `<li>` properties.
 */
export type ReactItemProps = LiHTMLAttributes<HTMLLIElement>

/**
 * {@link Item} component properties.
 */
export interface ItemProps extends ReactItemProps {
  //
}

/**
 * Possible {@link Item} types.
 */
export enum ItemTypes {
  Menu = 'menu'
}

/**
 * {@link MenuItem} component properties.
 */
export interface MenuItemProps extends ItemProps {
  'data-separator'?: boolean | boolean
  href?: string
  menu?: MenuProps
}

/**
 * Renders a `<li>` element with the class `adm-item`.
 *
 * @param props - Component data
 */
export const Item: FC<ItemProps> = props => (
  <li {...(useMutatedProps(props, 'adm-item') as ReactItemProps)} />
)

/**
 * Renders an {@link Item} component with the class `menu-item`.
 *
 * @param props - Component data
 */
export const MenuItem: FC<MenuItemProps> = ({ menu, ...rest }) => {
  const { trigger } = useDisclosure({ content: menu })
  let mutatedProps = useMutatedProps(rest, 'menu-item')

  if (menu) {
    mutatedProps = {
      ...trigger,
      ...{
        ...mutatedProps,
        role: 'button',
        type: 'reset'
      }
    }

    return <Item {...mutatedProps}>{/* TODO: Implement disclosure */}</Item>
  }

  return <Item {...mutatedProps} />
}

Item.defaultProps = {}

MenuItem.defaultProps = {}

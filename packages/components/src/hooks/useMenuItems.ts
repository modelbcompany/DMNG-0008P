import { AnyObject } from 'declarations'
import { MenuItemProps } from 'lib'
import _ from 'lodash'
import { useEffect } from 'react'
import { isArray, isObject } from 'utils'
import useArray from './useArray'
import useObject from './useObject'

/**
 * @file Merge {@link Menu} data with dynamic {@link MenuItem} properties
 * @module hooks/useMenuItems
 */

/**
 * Configuration object type for {@link Menu} components.
 */
export type MenuConfiguration = {
  /**
   * Top level menu data to merge.
   *
   * @default []
   */
  top?: MenuItemProps[]

  /**
   * Sub level menu data to merge.
   *
   * @default []
   */
  sub?: MenuItemProps[]
}

/**
 * Takes in an array of {@link MenuItem} properties and merges the properties
 * with the data found in @param initalConfig.top, if defined.
 *
 * If any of the properties in @param initialItems define the `menu` property,
 * the {@link MenuItem} properties found in the object will be merged with the
 * data from @param initialConfig.sub, if defined.
 *
 * If either of the arrays in @param initialConfig contain a single object, it
 * will be merged into all of the objects found in @param initialItems if more
 * than one object is found in either config array, the config objects will be
 * merged by index, allowing for dynamic data merging.
 *
 * @param {MenuItemProps[]} initialItems - Menu data
 * @param {object} initialConfig - {@link Menu} configuration
 * @param {MenuItemProps[]} initialConfig.top - Top level menu data to merge
 * @param {MenuItemProps[]} initialConfig.sub - Sub level menu data to merge
 * @returns {object}
 */
export const useMenuItems = (
  initialItems: MenuItemProps[],
  initialConfig: MenuConfiguration
) => {
  const sanitizeProps = (arr: MenuItemProps[]): MenuItemProps[] => {
    if (!isArray(arr) || !arr.length) return []
    return arr.map(value => isObject(value) || {})
  }

  const { empty: noConfig, object: config, setObject: setConfig } = useObject({
    sub: sanitizeProps(initialConfig.sub || []),
    top: sanitizeProps(initialConfig.top || [])
  })

  const { array: items, setArray: setItems } = useArray<MenuItemProps>(
    initialItems
  )

  /**
   * NOTICE - Disabling react-hooks/exhaustive-deps
   *
   * If `config`, `config.top`, `config.sub`, or `items` are used in the
   * `useEffect` dependency array, the following error will be thrown:
   *
   * `Warning: Maximum update depth exceeded. This can happen when a component
   * calls setState inside useEffect, but useEffect either doesn't have a
   * dependency array, or one of the dependencies changes on every render.`
   *
   * Furthermore, `setItems` does not need to be tracked.
   */

  /* eslint-disable react-hooks/exhaustive-deps */

  useEffect(() => {
    if (!noConfig && config.top.length) {
      const getConfig = (arr: any[], i: number) => arr[arr.length === 1 ? 0 : i]

      setItems(
        items.map(function mergeProps(item: AnyObject, i, conf) {
          item = _.merge(item, isObject(conf) || getConfig(config.top, i))

          if (item?.menu?.items) {
            item.menu.items = item.menu.items.map((props, j) =>
              mergeProps(props, j, getConfig(config.sub, i))
            )
          } else {
            delete item.menu

            if (!item.href) item.role = 'button'
          }

          return item
        })
      )
    }
  }, [config.top.length, noConfig, items.length])

  /* eslint-enable react-hooks/exhaustive-deps */

  return { config, items, noConfig, setConfig, setItems }
}

export default useMenuItems

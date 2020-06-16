import { IconProps } from 'lib'
import { Props } from 'definitions'
import _ from 'lodash'
import { Children } from 'react'
import { classNames } from 'utils'
import useIcon from './useIcon'

/**
 * @file Add global mutations to incoming props
 * @module hooks/useMutatedProps
 */

/**
 * Adds global mutations to the incoming component properties.
 *
 * Mutations (in order):
 *
 * - @param props.icon will be used to render an Icon with @param props.children
 * - @param props.children will be converted to an array
 * - @param injectClass will be prepended to @param props.className
 * - The `role` property will be updated based on the presence of a href or
 *   onClick property (not inlcuding native buttons and links)
 * - keys specified in @param keys will be removed @param props
 *
 * @param {Props} props - Component properties
 * @param {ReactNode} props.children - Component children
 * @param {IconProps} props.icon - {@link Icon} component properties
 * @param {string} injectClass - Classes to inject before @param props.className
 * @param {string[]} keys - Array of keys to remove from @param props
 * @returns {Props}
 */
export function useMutatedProps<T>(
  props: T,
  injectClass?: string,
  keys?: string[]
): Props {
  const propsAsProps = props as Props

  const mutated = Object.assign(
    {
      ...propsAsProps,
      className: classNames(injectClass, propsAsProps.className)
    },
    _.pick(useIcon(props as IconProps), ['children', 'data-icon'])
  )

  const mutatedAsProps = mutated as Props

  if (
    !mutated.className.includes('ada-button') &&
    !mutatedAsProps.href &&
    mutated.onClick
  ) {
    mutatedAsProps.role = 'button'
  } else if (!mutated.className.includes('ada-link') && mutatedAsProps.href) {
    mutatedAsProps.role = 'link'
  }

  const voidElementTagClassNames = [
    'ada-divider',
    'ada-image',
    'ada-input',
    'ada-textarea'
  ]

  if (!keys) keys = []

  const removeFromVoidElementTags = ['children', 'dangerouslySetInnerHTML']

  mutated.className.split(' ').forEach(className => {
    if (voidElementTagClassNames.includes(className)) {
      keys = (keys as string[]).concat(removeFromVoidElementTags)
    }
  })

  if (mutated.children) {
    mutated.children = Children.toArray(mutated.children).flat()
  }

  if (mutatedAsProps.disabled !== undefined) {
    mutated['aria-disabled'] = mutatedAsProps.disabled
  }

  keys.push(
    'icon',
    'isGroup',
    'initialItems',
    'initialState',
    'initialVisibility'
  )

  return _.omit(mutated, keys ? _.uniq(keys) : '')
}

export default useMutatedProps

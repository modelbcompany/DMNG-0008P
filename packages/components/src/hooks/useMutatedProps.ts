import { AnyObject, Props } from 'declarations'
import { omit, uniq } from 'lodash'
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
 * @param props - Component properties
 * @param props.children - Component children
 * @param props.icon - {@link Icon} component properties
 * @param injectClass - Classes to inject before @param props.className
 * @param keys - Array of keys to remove from @param props
 * @returns {Props}
 */
export function useMutatedProps<T = AnyObject>(
  props: T,
  injectClass?: string,
  keys?: string[]
): Partial<Props> {
  const mutated = Object.assign({}, props) as Props
  const { 'data-icon': icon, children: childrenWithIcon } = useIcon(props)

  mutated.className = classNames(
    injectClass as string,
    (props as Props).className
  )

  if (icon) mutated['data-icon'] = icon

  if (mutated.children) {
    if (icon) mutated.chidlren = childrenWithIcon
    mutated.children = Children.toArray(mutated.children).flat()
  }

  if (
    !mutated.className.includes('ada-button') &&
    !mutated.href &&
    mutated.onClick
  ) {
    mutated.role = 'button'
  } else if (!mutated.className.includes('ada-link') && mutated.href) {
    mutated.role = 'link'
  }

  const voidElementTagClassNames = [
    'ada-divider',
    'ada-image',
    'ada-input',
    'ada-textarea'
  ]

  if (!keys) keys = []

  const removeFromVoidElementTags = ['children', 'dangerouslySetInnerHTML']

  mutated.className.split(' ').forEach((className: string) => {
    if (voidElementTagClassNames.includes(className)) {
      keys = (keys as string[]).concat(removeFromVoidElementTags)
    }
  })

  keys.push(
    'icon',
    'isGroup',
    'initialItems',
    'initialOptions',
    'initialState',
    'initialVisibility'
  )

  if (mutated.disabled !== undefined) {
    mutated['aria-disabled'] = mutated.disabled
  }

  return omit(mutated, keys ? uniq(keys) : [])
}

export default useMutatedProps

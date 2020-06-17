import { Children, Props } from 'declarations'
import { Icon, IconProps } from 'lib'
import React, { useEffect } from 'react'
import { isArray } from 'utils'
import useArray from './useArray'
import useBoolean from './useBoolean'
import useObject from './useObject'

/**
 * @file Hook to render props.children with an @link Icon beside it
 * @module hooks/useIcon
 *
 * @todo Update documentation
 */

export type UseIconParameters = Pick<Props<IconProps>, 'children' | 'icon'>

export type UseIconState = {
  children: Children
  'data-icon': boolean | undefined
  iconProps: any
  setChildren: (arr: any) => void
  setIconProps: React.Dispatch<any>
}

/**
 * Render @param param0.children beside an {@link Icon} component.
 *
 * @param {Props} param0 - Incoming props
 * @param {React.ReactNode} param0.children - Inner content
 * @param {IconProps} param0.icon - @link Icon props
 * @returns {ReactFragment}
 */
export const useIcon = ({
  children: kids,
  icon: props
}: UseIconParameters): UseIconState => {
  kids = isArray(kids) || [kids]

  const { array: children, setArray: setChildren } = useArray(kids as [])
  const { empty, object: iconProps, setObject: setIconProps } = useObject(props)
  const { boolean: exists } = useBoolean(
    props === undefined || props === null ? false : !!props
  )

  useEffect(() => {
    if (!empty) {
      const mutatedIconProps = {
        ...iconProps,
        'aria-hidden': children ? props?.['aria-hidden'] : false,
        className: 'ada-span icon'
      }

      const component = <Icon {...(mutatedIconProps as IconProps)} />

      if (iconProps['data-position'] === 'right') {
        setChildren([kids, component])
      } else {
        setChildren([component, kids])
      }

      setIconProps(mutatedIconProps)
    }
  }, [empty])

  return {
    children,
    'data-icon': (exists as boolean) || undefined,
    iconProps,
    setChildren,
    setIconProps
  }
}

export default useIcon

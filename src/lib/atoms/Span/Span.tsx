import * as MaterialIcon from '@material-ui/core/Icon'
import { Props } from 'definitions'
import { useMutatedProps } from 'hooks'
import { merge, omit } from 'lodash'
import React, { FC, HTMLAttributes } from 'react'
import './sass/Span.scss'

/**
 * @module Components/Atoms/Span
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/span}
 * @see {@link https://reactjs.org/docs/dom-elements.html}
 */

/**
 * Material icon component properties.
 */
export type MaterialIconProps = MaterialIcon.IconProps

/**
 * React `<span>` properties.
 */
export type ReactSpanProps = HTMLAttributes<HTMLSpanElement>

/**
 * {@link Span} component properties.
 */
export interface SpanProps extends Props {
  //
}

/**
 * {@link Icon} component properties.
 */
export interface IconProps extends SpanProps {
  /**
   * If rendering inside of another component, such as `Button` or `Link`, this
   * value determines where the `Icon` will be placed.
   *
   * https://developer.mozilla.org/docs/Web/HTML/Global_attributes/data-*
   */
  'data-position'?: 'right' | 'left' | ''
}

/**
 * Renders a `<span>` element with the class `ada-span`.
 */
export const Span: FC<SpanProps> = (props: SpanProps) => (
  <span {...(useMutatedProps(props, 'ada-span') as ReactSpanProps)} />
)

/**
 * Renders a {@link Span} component with the class `icon`.
 */
export const Icon: FC<IconProps> = (props: IconProps) => {
  const mutatedProps = useMutatedProps(props, 'ada-span icon')

  // If not rendering a Font Awesome icon
  if (!mutatedProps?.className?.includes('fa-')) {
    mutatedProps.className = `material-icons-outlined ${mutatedProps.className}`
    mutatedProps['data-ligature'] = mutatedProps.children
  }

  return <MaterialIcon.default {...(mutatedProps as MaterialIconProps)} />
}

/**
 * Renders a `<span>` element with the class `placeholder`.
 */
export const Placeholder: FC<SpanProps> = ({
  innerProps,
  innerRef,
  ...rest
}) => {
  const mutatedProps = useMutatedProps(
    omit(merge(rest, innerProps), ['options', 'selectProps', 'theme']),
    'ada-span placeholder'
  )

  return <span {...mutatedProps} ref={innerRef} />
}

Icon.defaultProps = {
  'aria-hidden': true
}

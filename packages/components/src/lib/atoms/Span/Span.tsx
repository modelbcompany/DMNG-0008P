import { Props } from 'declarations'
import { useMutatedProps } from 'hooks'
import { merge, omit } from 'lodash'
import React, { FC, HTMLAttributes } from 'react'

/**
 * @module Components/Atoms/Span
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/span}
 * @see {@link https://reactjs.org/docs/dom-elements.html}
 */

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
 * Renders a `<span>` element with the class `mb-ada-span`.
 */
export const Span: FC<SpanProps> = (props: SpanProps) => (
  <span {...(useMutatedProps(props, 'mb-ada-span') as ReactSpanProps)} />
)

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
    'mb-ada-span placeholder'
  )

  return <span {...mutatedProps} ref={innerRef} />
}

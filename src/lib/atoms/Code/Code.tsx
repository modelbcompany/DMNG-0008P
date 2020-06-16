import { Props } from 'declarations'
import { useMutatedProps } from 'hooks'
import React, { FC, HTMLAttributes } from 'react'
import './sass/Code.scss'

/**
 * @module Components/Atoms/Code
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/code}
 */

/**
 * React `<code>` properties.
 */
export type ReactCodeProps = HTMLAttributes<HTMLElement>

/**
 * {@link Code} component properties.
 */
export interface CodeProps extends Props {
  //
}

/**
 * Renders a `<code>` element with the class `ada-code`.
 *
 * **https://developer.mozilla.org/docs/Web/HTML/Element/code**
 */
export const Code: FC<CodeProps> = (props: CodeProps) => {
  const mutatedProps = useMutatedProps(props, 'ada-code')
  return <code {...(mutatedProps as ReactCodeProps)} />
}

Code.defaultProps = {
  children: 'const hello = "World"'
}

import { VoidElementTagProps } from 'declarations'
import { useMutatedProps } from 'hooks'
import _ from 'lodash'
import React, { FC, HTMLAttributes } from 'react'
import './sass/Divider.scss'

/**
 * @module Components/Atoms/Divider
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/hr}
 */

/**
 * React `<hr>` properties.
 */
export type ReactDividerProps = HTMLAttributes<HTMLHRElement>

/**
 * {@link Divider} component properties.
 */
export interface DividerProps extends VoidElementTagProps {
  /**
   * Sets the color of the rule through color name or hexadecimal value.
   */
  color?: string
}

/**
 * Renders a `<hr>` element with the class `ada-divider`.
 *
 * **https://developer.mozilla.org/docs/Web/HTML/Element/hr**
 */
export const Divider: FC<DividerProps> = (props: DividerProps) => {
  const mutatedProps = _.omit(useMutatedProps(props, 'ada-divider'), 'children')
  return <hr {...(mutatedProps as ReactDividerProps)} />
}

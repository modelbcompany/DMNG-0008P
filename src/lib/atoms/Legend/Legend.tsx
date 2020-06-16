import { Props } from 'declarations'
import { useMutatedProps } from 'hooks'
import React, { FC, HTMLAttributes } from 'react'
import './sass/Legend.scss'

/**
 * @module Components/Atoms/Legend
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/legend}
 */

/**
 * React `<legend>` properties.
 */
export type ReactLegendProps = HTMLAttributes<HTMLLegendElement>

/**
 * {@link Legend} component properties.
 */
export interface LegendProps extends Props {
  //
}

/**
 * Renders a `<legend>` element with the class `ada-legend`.
 *
 * **https://developer.mozilla.org/docs/Web/HTML/Element/legend**
 */
export const Legend: FC<LegendProps> = (props: LegendProps) => (
  <legend {...(useMutatedProps(props, 'ada-label') as ReactLegendProps)} />
)

Legend.defaultProps = {
  children: 'Legend text'
}

import { Props } from 'declarations'
import { useMutatedProps } from 'hooks'
import React, { FC, HTMLAttributes } from 'react'
import './sass/Summary.scss'

/**
 * @module Components/Atoms/Summary
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/summary}
 */

/**
 * React `<summary>` properties.
 */
export type ReactSummaryProps = HTMLAttributes<HTMLElement>

/**
 * {@link Summary} component properties.
 */
export interface SummaryProps extends Props {
  //
}

/**
 * Renders a `<summary>` element with the class `ada-summary`.
 *
 * **https://developer.mozilla.org/docs/Web/HTML/Element/summary**
 */
export const Summary: FC<SummaryProps> = (props: SummaryProps) => (
  <summary {...(useMutatedProps(props, 'ada-label') as ReactSummaryProps)} />
)

Summary.defaultProps = {
  children: 'Summary text'
}

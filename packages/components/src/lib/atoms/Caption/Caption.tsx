import { Props } from 'declarations'
import { useMutatedProps } from 'hooks'
import React, { FC, HTMLAttributes } from 'react'
import './sass/Caption.scss'

/**
 * @module Components/Atoms/Caption
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/caption}
 */

/**
 * React `<caption>` properties.
 */
export type ReactCaptionProps = HTMLAttributes<HTMLTableCaptionElement>

/**
 * {@link Caption} component properties.
 */
export interface CaptionProps extends Props {
  //
}

/**
 * Renders a `<caption>` element with the class `ada-caption`.
 *
 * @param props - Component data
 */
export const Caption: FC<CaptionProps> = (props: CaptionProps) => {
  const mutatedProps = useMutatedProps(props, 'ada-caption')
  return <caption {...(mutatedProps as ReactCaptionProps)} />
}

Caption.defaultProps = {
  children: 'Table caption'
}

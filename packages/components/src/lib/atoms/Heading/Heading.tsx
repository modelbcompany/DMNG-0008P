import { Props } from 'declarations'
import { useMutatedProps } from 'hooks'
import React, { FC, HTMLAttributes } from 'react'
import './sass/Heading.scss'

/**
 * @module Components/Atoms/Heading
 * @see
 * {@link https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements}
 * @see {@link https://reactjs.org/docs/dom-elements.html}
 */

/**
 * React heading element props.
 */
export type ReactHeadingProps = HTMLAttributes<HTMLHeadingElement>

/**
 * {@link Heading} component properties.
 */
export interface HeadingProps extends Props {
  /**
   * Heading size.
   *
   * @default 1
   */
  size: 1 | 2 | 3 | 4 | 5 | 6
}

/**
 * Renders a `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, or `<h6>` element with the
 * base class `ada-heading`.
 *
 * **https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements**
 */
export const Heading: FC<HeadingProps> = ({ size, ...rest }: HeadingProps) => {
  const mutatedProps = useMutatedProps(rest, 'ada-heading')
  mutatedProps['data-size'] = size

  const mutatedPropsAsReactHeadingProps = mutatedProps as ReactHeadingProps

  /* eslint-disable jsx-a11y/heading-has-content */

  switch (size) {
    case 2:
      return <h2 {...mutatedPropsAsReactHeadingProps} />
    case 3:
      return <h3 {...mutatedPropsAsReactHeadingProps} />
    case 4:
      return <h4 {...mutatedPropsAsReactHeadingProps} />
    case 5:
      return <h5 {...mutatedPropsAsReactHeadingProps} />
    case 6:
      return <h6 {...mutatedPropsAsReactHeadingProps} />
    default:
      return <h1 {...mutatedPropsAsReactHeadingProps} />
  }

  /* eslint-enable jsx-a11y/heading-has-content */
}

Heading.defaultProps = {
  children: 'The quick brown fox jumps over the lazy dog'
}

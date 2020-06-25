import { Props } from 'declarations'
import { useMutatedProps } from 'hooks'
import React, { AnchorHTMLAttributes, FC } from 'react'


/**
 * @module Components/Atoms/Link
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/a}
 */

/**
 * React `<a>` properties.
 */
export type ReactLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

/**
 * {@link Link} component properties.
 */
export interface LinkProps extends Props {
  /**
   * Prompts the user to save the linked URL instead of navigating to it.
   */
  download?: boolean

  /**
   * The URL that the hyperlink points to.
   *
   * @default '#'
   */
  href?: string

  /**
   * The relationship of the linked URL as space-separated link types.
   *
   * @default 'noreferrer noopener'
   */
  rel?: string

  /**
   * If true, the latest entry on the history stack will be replaced with a new
   * one. Use this when you don’t want the previous page to show up when the
   * user clicks the back button.
   */
  replace?: boolean

  /**
   * Where to display the linked URL, as the name for a browsing context (a tab,
   * window, or `<iframe>`).
   *
   * @default '_self'
   */
  target?: '_self' | '_blank' | '_parent' | '_top'
}

/**
 * Renders an `<a>` element with the class `mb-ada-link`.
 *
 * **https://developer.mozilla.org/docs/Web/HTML/Element/a**
 */
export const Link: FC<LinkProps> = (props: LinkProps) => (
  /* eslint-disable jsx-a11y/anchor-has-content */
  <a {...(useMutatedProps(props, 'mb-ada-link') as ReactLinkProps)} />
  /* eslint-enable jsx-a11y/anchor-has-content */
)

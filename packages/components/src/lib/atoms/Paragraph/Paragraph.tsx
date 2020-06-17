import { Props } from 'declarations'
import { useMutatedProps } from 'hooks'
import React, { FC, HTMLAttributes } from 'react'
import './sass/Paragraph.scss'

/**
 * @module Components/Atoms/Paragraph
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/p}
 */

/**
 * React `<p>` properties.
 */
export type ReactParagraphProps = HTMLAttributes<HTMLParagraphElement>

/**
 * {@link Paragraph} component properties.
 */
export interface ParagraphProps extends Props {
  //
}

/**
 * Renders a `<p>` element with the class `ada-paragraph`.
 *
 * **https://developer.mozilla.org/docs/Web/HTML/Element/p**
 */
export const Paragraph: FC<ParagraphProps> = (props: ParagraphProps) => (
  <p {...(useMutatedProps(props, 'ada-paragraph') as ReactParagraphProps)} />
)

Paragraph.defaultProps = {
  children:
    'The quick brown fox jumps over the lazy dog. How vexingly quick daft zebras jump! Sphinx of black quartz, judge my vow. The five boxing wizards jump quickly. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. Jived fox nymph grabs quick waltz. Glib jocks quiz nymph to vex dwarf.'
}

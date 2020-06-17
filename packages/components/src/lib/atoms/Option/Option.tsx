import { OptionProps } from 'declarations'
import { useMutatedProps } from 'hooks'
import React, { FC, OptionHTMLAttributes } from 'react'

/**
 * @module Components/Atoms/Option
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/option}
 */

/**
 * React `<option>` properties.
 */
export type ReactOptionProps = OptionHTMLAttributes<HTMLOptionElement>

/**
 * Renders an Ant Design `Option` component with the class `ada-option`.
 *
 * **https://developer.mozilla.org/docs/Web/HTML/Element/option**
 */
export const Option: FC<OptionProps> = (props: OptionProps) => (
  <option {...(useMutatedProps(props, 'ada-option') as ReactOptionProps)} />
)

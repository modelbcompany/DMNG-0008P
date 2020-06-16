import { FormElementProps, VoidElementTagProps } from 'definitions'
import { useMutatedProps } from 'hooks'
import React, { FC, TextareaHTMLAttributes } from 'react'
import './sass/TextArea.scss'

/**
 * @module Components/Atoms/TextArea
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/textarea}
 */

/**
 * React `<textarea>` properties.
 */
export type ReactTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

/**
 * {@link TextArea} component properties.
 */
export interface TextAreaProps extends FormElementProps, VoidElementTagProps {
  /**
   * Indicates whether the value of the control can be automatically completed
   * by the browser.
   *
   * @default 'off'
   */
  autoComplete?: 'off' | 'on'

  /**
   * The visible width of the text control, in average character widths. If it
   * is specified, it must be a positive integer.
   *
   * @default 20
   */
  cols?: number

  /**
   * The maximum number of characters (UTF-16 code units) that the user can
   * enter. If this value isn't specified, the user can enter an unlimited
   * number of characters.
   */
  maxLength?: number

  /**
   * The minimum number of characters (UTF-16 code units) required that the user
   * should enter.
   */
  minLength?: number

  /**
   * A hint to the user of what can be entered in the control.
   *
   * Carriage returns or line-feeds within the placeholder text must be treated
   * as line breaks when rendering the hint.
   *
   * @default 'A hint to the user of what can be entered in the control'
   */
  placeholder?: string

  /**
   * Indicates that the user cannot modify the value of the control.
   *
   * Unlike the `disabled` attribute, the `readOnly` attribute does not prevent
   * the user from clicking or selecting in the control.
   *
   * The value of a read-only control is still submitted with the form.
   */
  readOnly?: boolean

  /**
   * Specifies that the user must fill in a value before submitting a form.
   */
  required?: boolean

  /**
   * The number of visible text lines for the control.
   */
  rows?: number

  /**
   * Indicates how the control wraps text.
   *
   * Possible values are:
   *
   * - `'hard'`: The browser automatically inserts line breaks (CR+LF) so that
   *   each line has no more than the width of the control; the cols attribute
   *   must also be specified for this to take effect.
   * - `'soft'`: The browser ensures that all line breaks in the value consist
   *   of a CR+LF pair, but does not insert any additional line breaks.
   * - `'off'`: Like soft but changes appearance to `white-space: pre` so line
   *   segments exceeding cols are not wrapped and the `<textarea>` becomes
   *   horizontally scrollable.
   *
   * If this attribute is not specified, `soft` is its default value.
   */
  wrap?: 'hard' | 'soft' | 'off'
}

/**
 * Renders an `<textarea>` element with the class `ada-textarea`.
 *
 * **https://developer.mozilla.org/docs/Web/HTML/Element/textarea**
 */
export const TextArea: FC<TextAreaProps> = (props: TextAreaProps) => {
  const mutatedProps = useMutatedProps(props, 'ada-textarea')
  return <textarea {...(mutatedProps as ReactTextAreaProps)} />
}

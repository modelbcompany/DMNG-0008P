import { FormElementProps, Props } from 'declarations'
import { useMutatedProps } from 'hooks'
import React, { ButtonHTMLAttributes, FC } from 'react'
import './sass/Button.scss'

/**
 * @module Components/Atoms/Button
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/button}
 */

/**
 * React `<button>` properties.
 */
export type ReactButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

/**
 * {@link Button} component properties.
 */
export interface ButtonProps extends FormElementProps, Props {
  /* eslint-disable prettier/prettier */

  /**
   * This attribute on a `<button>` is nonstandard and Firefox-specific.
   *
   * Unlike other browsers, Firefox persists the dynamic disabled state of a
   * `<button>` across page loads.
   *
   * Setting `autoComplete="off"` on the button disables this feature.
   */
  autoComplete?:
  | 'off'
  | 'on'
  | 'name'
  | 'honorific-prefix'
  | 'given-name'
  | 'additional-name'
  | 'family-name'
  | 'honorific-suffix'
  | 'nickname'
  | 'email'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'one-time-code'
  | 'organization-title'
  | 'organization'
  | 'street-address'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level4'
  | 'address-level3'
  | 'address-level2'
  | 'address-level1'
  | 'country'
  | 'country-name'
  | 'postal-code'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc'
  | 'cc-type'
  | 'transaction-currency'
  | 'transaction-amount'
  | 'language'
  | 'bday'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'sex'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-area-code'
  | 'tel-local'
  | 'tel-extension'
  | 'impp'
  | 'url'
  | 'photo'

  /* eslint-enable prettier/prettier */

  /**
   * The URL that processes the information submitted by the button.
   *
   * Overrides the `action` attribute of the button's form owner. Does nothing
   * if there is no form owner.
   */
  formAction?: string

  /**
   * If the button is a submit button (it's inside/associated with a `<form>`
   * and doesn't have `type="button"`), specifies how to encode the form data
   * that is submitted.
   *
   * Possible values:
   *
   * - `application/x-www-form-urlencoded`: Default if the attribute is not used
   * - `multipart/form-data`: Use to submit `<input>` elements with their type
   *   attributes set to `file`
   * - `text/plain`: Specified as a debugging aid; shouldn’t be used for real
   *   form submission
   *
   * If this attribute is specified, it overrides the `encType` attribute of the
   * button's form owner.
   */
  formEncType?: string

  /**
   * If the button is a submit button (it's inside/associated with a `<form>`
   * and doesn't have `type="button"`), this attribute specifies the
   * [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) method
   * used to submit the form.
   *
   * Possible values:
   *
   * - `post`: The data from the form are included in the body of the HTTP
   *   request when sent to the server. Use when the form contains information
   *   that shouldn’t be public, like login credentials
   * - `get`: The form data are appended to the form's action URL, with a ? as a
   *   separator, and the resulting URL is sent to the server. Use this method
   *   when the form has no side effects, like search forms
   *
   * If specified, this attribute overrides the `method` attribute of the
   * button's form owner.
   */
  formMethod?: string

  /**
   * If the button is a submit button, this attribute specifies that the
   * form is not to be validated when it is submitted.
   *
   * If this attribute is specified, it overrides the `noValidate` attribute of
   * the button's form owner.
   */
  formNoValidate?: boolean

  /**
   * If the button is a submit button, this attribute is a author-defined name
   * or standardized, underscore-prefixed keyword indicating where to display
   * the response from submitting the form. This is the `name` of, or keyword
   * for, a browsing context (a tab, window, or `<iframe>`).
   *
   * If this attribute is specified, it overrides the `target` attribute of the
   * button's form owner.
   *
   * Possible values:
   *
   * - `_self`: Load the response into the same browsing context as the current
   *   one. This is the default if the attribute is not specified
   * - `_blank`: Load the response into a new unnamed browsing context — usually
   *   a new tab or window, depending on the user’s browser settings
   * - `_parent`: Load the response into the parent browsing context of the
   *   current one. If there is no parent, behaves the same way as `_self `
   * - `_top`: Load the response into the top-level browsing context (that is,
   *   the browsing context that is an ancestor of the current one, and has no
   *   parent).
   *
   * If there is no parent, `_parent` and `_top` behave the same way as `_self`.
   */
  formTarget?: string

  /**
   * The default behavior of the button.
   *
   * Possible values:
   *
   * - `submit`: The button submits the form data to the server. This is the
   *   default if the attribute is not specified for buttons associated with a
   *   `<form>`, or if the attribute is an empty or invalid value
   * - `reset`: Resets all the controls to their initial values
   * - `button`: No default behavior, and does nothing when pressed by default.
   *   It can have client-side scripts listen to the element's events, which are
   *   triggered when the events occur
   *
   * @default 'button'
   */
  type?: 'submit' | 'reset' | 'button'
}

/**
 * Renders a `<button>` element with the class `ada-button`.
 *
 * https://developer.mozilla.org/docs/Web/HTML/Element/button
 */
export const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const mutatedProps = useMutatedProps(props, 'ada-button')

  if (mutatedProps.name === 'smooth_scroll') {
    mutatedProps.value = JSON.stringify(mutatedProps.value)
  }

  return <button {...(mutatedProps as ReactButtonProps)} />
}

Button.defaultProps = {
  type: 'button'
}

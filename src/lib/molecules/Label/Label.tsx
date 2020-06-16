import { Props } from 'declarations'
import { useMutatedProps } from 'hooks'
import {
  Button,
  ButtonProps,
  Input,
  InputProps,
  Select,
  SelectProps,
  Span,
  SpanProps,
  TextArea,
  TextAreaProps
} from 'lib'
import React, { FC, LabelHTMLAttributes } from 'react'
import { classNames } from 'utils'
import './sass/Label.scss'

/**
 * @module Components/Molecules/Label
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/label}
 */

/**
 * React `<label>` properties.
 */
export type ReactLabelProps = LabelHTMLAttributes<HTMLLabelElement>

/**
 * {@link Label} component properties.
 */
export interface LabelProps extends Props {
  /**
   * The `<form>` element with which the label is associated (its form owner).
   *
   * If specified, the value of the attribute is the id of a `<form>` element in
   * the same document. This lets you place label elements anywhere within a
   * document, not just as descendants of their form elements.
   */
  form?: string

  /**
   * The `id` of a labelable form-related element in the same document as the
   * `<label>` element.
   *
   * The first element in the document with an id matching the value of the
   * `for` attribute is the labeled control for this label element, if it is a
   * labelable element.
   *
   * If it is not labelable then the for attribute has no effect.
   *
   * If there are other elements which also match the id value, later in the
   * document, they are not considered.
   */
  htmlFor?: string

  /**
   * Properties to pass to the `Span` element rendering the label text.
   */
  span?: SpanProps
}

export interface LabeledFormElementProps extends Omit<LabelProps, 'children'> {
  /**
   * If defined, render a `Span` component with additional text beneath the
   * `Form` element.
   */
  formElementDescription?: SpanProps

  /**
   * Properties for a `Button`, `Input`, `Select` or `TextArea` component.
   */
  formElementProps?: ButtonProps | InputProps | SelectProps | TextAreaProps

  /**
   * Tag name of the `Form` element to render.
   */
  formElementTagName?: 'button' | 'input' | 'select' | 'textarea'
}

/**
 * Renders a `<label>` element with the class `adm-label`.
 *
 * **https://developer.mozilla.org/docs/Web/HTML/Element/label**
 */
export const Label: FC<LabelProps> = ({
  children,
  span,
  ...rest
}: LabelProps) => {
  const mutatedProps = useMutatedProps(rest, 'adm-label')

  return (
    <label {...(mutatedProps as ReactLabelProps)}>
      {span ? <Span {...span} /> : null}
      {children}
    </label>
  )
}

/**
 * Renders a {@link Label} component with a {@link Button}, {@link Input},
 * {@link Select}, or {@link TextArea} component inside.
 */
export const LabeledFormElement: FC<LabeledFormElementProps> = ({
  formElementDescription,
  formElementProps,
  formElementTagName,
  ...rest
}) => {
  const mutatedProps = useMutatedProps(
    rest,
    `labeled-form-element ${formElementTagName || 'input'}`
  )

  return (
    <Label {...mutatedProps}>
      {(() => {
        switch (formElementTagName) {
          case 'button':
            return <Button {...(formElementProps as ButtonProps)} />
          case 'select':
            console.debug('select', formElementProps)
            return <Select {...formElementProps} />
          case 'textarea':
            return <TextArea {...(formElementProps as TextAreaProps)} />
          default:
            return <Input {...formElementProps} />
        }
      })()}
      {(() => {
        if (formElementDescription) {
          formElementDescription.className = classNames(
            'labeled-form-element-description',
            formElementDescription.className
          )

          return <Span {...formElementDescription} />
        }

        return null
      })()}
    </Label>
  )
}

Label.defaultProps = {
  children: 'a11y: ensure every form element has a label!'
}

LabeledFormElement.defaultProps = {
  formElementProps: {},
  span: { children: 'Input label' }
}

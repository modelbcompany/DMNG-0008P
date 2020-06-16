import {
  Button,
  ButtonProps,
  Container,
  Input,
  InputProps,
  LabeledFormElementProps,
  Legend,
  LegendProps,
  Select,
  SelectProps,
  TextArea,
  TextAreaProps
} from 'lib'
import { Props } from 'definitions'
import { useMutatedProps } from 'hooks'
import React, { FC, FieldsetHTMLAttributes, ReactNode } from 'react'
import { LabeledFormElement } from '../Label'
import './sass/Fieldset.scss'

/**
 * @module Components/Molecules/Fieldset
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/fieldset}
 * @see {@link https://khrome.dev/blog/html-elements-with-flex-box-quirks/}
 */

/**
 * React `fieldset` component properties.
 */
export type ReactFieldsetProps = FieldsetHTMLAttributes<HTMLFieldSetElement>

/**
 * {@link Fieldset} component properties.
 */
export interface FieldsetProps extends Props {
  /**
   * If true, all form controls that are descendants of the `<fieldset>`, are
   * disabled, meaning they are not editable and won't be submitted along with
   * the `<form>`.
   *
   * They won't receive any browsing events, like mouse clicks or focus-related
   * events. By default browsers display such controls grayed out. Note that
   * form elements inside the `<legend>` element won't be disabled.
   */
  disabled?: boolean

  /**
   * `id` attribute of a `<form>` element you want the `<fieldset>` to be part
   * of, even if it is not inside the form.
   */
  form?: string

  /**
   * If defined, render a {@link Legend} element inside of the {@link Fieldset}.
   *
   * The caption for the fieldset is given by the first `<legend>` element
   * nested inside it.
   */
  legend?: LegendProps

  /**
   * The name associated with the group.
   */
  name?: string
}

/* eslint-disable prettier/prettier */

/**
 * {@link FormField} layout configuration.
 */
export type FormFieldLayoutConfiguration = (
  | LabeledFormElementProps
  | ButtonProps
  | InputProps
  | SelectProps
  | TextAreaProps
)[]

/* eslint-enable prettier/prettier */

/**
 * {@link FormField} component properties.
 */
export interface FormFieldProps extends Omit<FieldsetProps, 'children'> {
  /**
   * Array of {@link Form} elements to render.
   *
   * @default []
   */
  layoutConfig?: FormFieldLayoutConfiguration

  /**
   * Tag name of the `Form` elements to render.
   */
  tagName?: LabeledFormElementProps['formElementTagName']
}

/**
 * Renders a `<fieldset>` element with the class `adm-fieldset`.
 *
 * Because `<fieldset>` elements ignore Flexbox properties, a `Container`
 * component with the class `fieldset-container` will wrap the child elements.
 *
 * See: https://khrome.dev/blog/html-elements-with-flex-box-quirks/
 */
export const Fieldset: FC<FieldsetProps> = ({ children, legend, ...rest }) => (
  <fieldset {...useMutatedProps(rest, 'adm-fieldset')}>
    <Container className='fieldset-container is-full-width'>
      {legend ? <Legend {...legend}></Legend> : null}
      {children}
    </Container>
  </fieldset>
)

/**
 * Renders a `Fieldset` component with the class `form-field`.
 *
 * An array of `Button`, `Input`, `Select` or `TextArea` components will be
 * rendered inside the component.
 */
export const FormField: FC<FormFieldProps> = ({
  layoutConfig = [],
  tagName = 'label',
  ...rest
}) => {
  const mutatedProps = useMutatedProps(rest, 'form-field')

  return (
    <Fieldset {...mutatedProps}>
      {layoutConfig.map((props, i) => {
        const tag = mutatedProps.formElementProps ? 'label' : tagName
        const key = `fieldset-element-${i}-${tagName}`

        let component: ReactNode = null

        switch (tag) {
          case 'button':
            component = <Button {...(props as ButtonProps)} key={key} />
            break
          case 'input':
            component = <Input {...(props as InputProps)} key={key} />
            break
          case 'select':
            component = <Select {...(props as SelectProps)} key={key} />
            break
          case 'textarea':
            component = <TextArea {...(props as TextAreaProps)} key={key} />
            break
          default:
            component = <LabeledFormElement {...props} key={key} />
        }
        return component
      })}
    </Fieldset>
  )
}

Fieldset.defaultProps = {}

FormField.defaultProps = {
  layoutConfig: []
}

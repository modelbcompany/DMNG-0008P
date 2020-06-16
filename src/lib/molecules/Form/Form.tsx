import { Container, FormField, FormFieldProps } from 'lib'
import { VoidElementTagProps } from 'definitions'
import { useArray, useMutatedProps, useWindowSize } from 'hooks'
import { merge, pick } from 'lodash'
import React, { FC, FormHTMLAttributes, useEffect } from 'react'
import './sass/Form.scss'

/**
 * @module Components/Molecules/Form
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/form}
 */

/**
 * React `<form>` properties.
 */
export type ReactFormProps = FormHTMLAttributes<HTMLFormElement>

/**
 * {@link Form} component properties.
 *
 * @todo Update property documentation.
 */
export interface FormProps extends VoidElementTagProps {
  /**
   * Layout configuration array.
   *
   * @default []
   */
  baseConfig?: FormContainerConfiguration[]

  /**
   * Data to merge with `baseConfig`.
   * Each key the should be `name` of a `FormField` component.
   *
   *
   * @default {}
   */
  mergeFields?: MergeFormFieldsConfiguration
}

/**
 * Configuration object to merge {@link FormField} data with the
 * component's {@link FormContainerConfiguration}.
 *
 * Each key the should be `name` of a `FormField` component.
 */
export type MergeFormFieldsConfiguration = Record<string, FormFieldProps>

/**
 * {@link Form} {@link Container} layout configuration.
 */
export type FormContainerConfiguration = [string, MergeFormFieldsConfiguration]

/**
 * Renders a `<form>` element with the class `adm-form`.
 */
export const Form: FC<FormProps> = ({
  baseConfig = [],
  mergeFields = {},
  ...rest
}) => {
  const mutatedProps = useMutatedProps(rest, 'adm-form')

  const { array: containers, setArray: setContainers } = useArray([])

  const { width } = useWindowSize()

  useEffect(() => {
    setContainers(
      baseConfig.map(({ 0: className, 1: fields }) => [
        className,
        Object.values(pick(merge(mergeFields, fields), Object.keys(fields)))
      ])
    )
  }, [baseConfig.length, Object.keys(mergeFields).length])

  return (
    <form {...(mutatedProps as ReactFormProps)}>
      {(() => {
        if ((mutatedProps.children as []).length) return mutatedProps.children

        return containers.map(({ 0: containerClasses, 1: fields }, i) => {
          if (width <= 768) {
            containerClasses = containerClasses.replace('row', 'column')
          }

          return (
            <Container
              className={`form-container ${containerClasses || 'column'}`}
              key={`form-container-${i}`}
            >
              {fields.map((field: FormFieldProps, i: number) => (
                <FormField {...field} key={`form-field-${i}`} />
              ))}
            </Container>
          )
        })
      })()}
    </form>
  )
}

Form.defaultProps = {
  autoComplete: 'on',
  noValidate: false,
  target: '_self'
}

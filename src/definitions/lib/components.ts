import {
  AriaAttributes,
  ButtonHTMLAttributes,
  ChangeEvent,
  DOMAttributes,
  FormEvent,
  InputHTMLAttributes,
  MouseEvent,
  ReactChildren,
  ReactNode,
  SelectHTMLAttributes
} from 'react'
import { GlobalEventHandlers } from '../html'
import { Obj, Primitive } from './global'

/**
 * @file Type Definitions - Components (Global)
 * @todo Update documentation
 */

/**
 * Component children.
 */
export type Children = ReactChildren | ReactChildren[] | ReactNode | ReactNode[]

/**
 * Event target type.
 */
export type Target = EventTarget & {
  dataset: Record<string, any>
}

/* eslint-disable prettier/prettier */

/**
 * Types of {@link Form} elements.
 */
export type FormElement =
  | ButtonHTMLAttributes<HTMLButtonElement>
  | InputHTMLAttributes<HTMLInputElement>
  | SelectHTMLAttributes<HTMLSelectElement>

/* eslint-enable prettier/prettier */

/**
 * {@link Form} element (button, input, etc) properties.
 */
export interface FormElementProps {
  /**
   * Specifies that a form control should have input focus when the page loads.
   *
   * Only one form-associated element in a document can have this attribute
   * specified.
   */
  autoFocus?: boolean

  /**
   * Indicates that the user cannot interact with the control.
   *
   * If this attribute is not specified, the control inherits its setting from
   * the containing element, for example `<fieldset>`; if there is no containing
   * element when the `disabled` attribute is set, the control is enabled.
   */
  disabled?: boolean

  /**
   * The `id` of the `<form>` element that the element is associated with.
   *
   * If this attribute is not specified, the element must be a descendant of a
   * form element.
   *
   * This attribute enables you to place elements anywhere within a document,
   * not just as descendants of form elements.
   */
  form?: string

  /**
   * The name of the control.
   */
  name?: string

  /**
   * Current value of the form control.
   *
   * Submitted with the form as part of a name/value pair.
   */
  value?: null | boolean | boolean[] | string | string[] | number | number[]
}

export type FormSubmissionEventHandler = (
  form: InitialState,
  event: FormSubmissionEvent
) => any

/* eslint-disable prettier/prettier */

export type FormSubmissionEvent = ChangeEvent<FormElement> &
  FormEvent<FormElement> &
  MouseEvent<HTMLElement> &
  MouseEvent<FormElement, MouseEvent<HTMLElement>> & {
    target: Target
  }

/* eslint-enable prettier/prettier */

export type InitialState = Record<string, any>

/**
 * {@link Option} component properties.
 */
export interface OptionProps extends Props {
  /**
   * If this Boolean attribute is set, this option is not checkable.
   *
   * Often browsers grey out such control and it won't receive any browsing
   * event, like mouse clicks or focus-related ones.
   *
   * If this attribute is not set, the element can still be disabled if one of
   * its ancestors is a disabled `<optgroup>` element.
   */
  disabled?: FormElementProps['disabled']

  /**
   * This attribute is text for the label indicating the meaning of the option.
   * If the label attribute isn't defined, its value is that of the element text
   * content.
   *
   * @default 'Option label'
   */
  label?: string

  /**
   * If present, this Boolean attribute indicates that the option is initially
   * selected.
   *
   * If the `<option>` element is the descendant of a `<select>` element whose
   * multiple attribute is not set, only one single `<option>` of this
   * `<select>` element may have the selected attribute.
   */
  selected?: boolean

  /**
   * Defines the value associated with the button’s name when it’s submitted
   * with the form data.
   *
   * This value is passed to the server in params when the form is submitted.
   */
  value?: FormElementProps['value']
}

/* eslint-disable prettier/prettier */

/**
 * Data that can be passed to all components.
 */
export type Props<T = Obj> = T & {
  /**
   * Inner content.
   */
  children?: ReactNode

  /**
   * `dangerouslySetInnerHTML` is React’s replacement for using `innerHTML` in
   * the browser DOM.
   *
   * **https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml**
   */
  // dangerouslySetInnerHTML?: {
  //   __html: string
  // }

  /**
   * Keys help React identify which items have changed, are added, or are
   * removed. Keys should assigned to array elements to give them  a stable
   * identity.
   *
   * https://reactjs.org/docs/lists-and-keys.html
   */
  key?: number | string

  /**
   * Icon to render beside the element text.
   */
  icon?: Record<string, any>
} & AriaAttributes &
  DOMAttributes<T> &
  GlobalEventHandlers

/* eslint-enable prettier/prettier */

export type VoidElementTagProps<T = Obj> = Omit<
  Props<T>,
  'children' | 'dangerouslySetInnerHTML'
>

export type PropsWithReqChildren<T = Obj> = Omit<Props<T>, 'children'> & {
  children: Children
}

/**
 * Data that can be passed to components that render {@link Container}
 * components as wrappers around their children.
 */
export type PropsWithContainer<T = Obj> = Props<T> & {
  container?: boolean
}

/**
 * Data that can be passed to components that handle list items, such as
 * {@link List} or {@link Menu}.
 */
export type PropsWithItems<T = Obj> = Omit<Props<T>, 'children'> & {
  /**
   * Initial items data.
   *
   * @default []
   */
  initialItems?: OptionProps[] | string[] | number[] | Obj[]
}

/**
 * Data that can be passed to components that handle user options, such as
 * {@link OptGroup} or {@link Select}.
 */
export type PropsWithOpts<T = Obj> = Omit<Props<T>, 'children'> & {
  /**
   * If true, treat `initialOptions` as an array of {@link OptGroup} data.
   *
   * @default false
   */
  groupOptions?: boolean

  /**
   * Initial options data.
   *
   * @default []
   */
  initialOptions?: OptionProps[] | Primitive[]
}

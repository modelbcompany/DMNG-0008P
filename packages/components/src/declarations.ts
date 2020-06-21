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

export type ApartmentWithPlan = {
  Amenities: string
  ApartmentId: string
  ApartmentName: string
  ApplyOnlineURL: string
  AvailabilityURL: string
  AvailableDate: string
  AvailableUnitsCount: string
  Baths: string
  Beds: string
  Deposit: string
  FloorplanHasSpecials: string
  FloorplanId: string
  FloorplanImageAltText: ''
  FloorplanImageName: string
  FloorplanImageURL: string
  FloorplanName: string
  MaximumDeposit: string
  MaximumRent: string
  MaximumSQFT: string
  MinimumDeposit: string
  MinimumRent: string
  MinimumSQFT: string
  PropertyId: string
  PropertyShowsSpecials: string
  SQFT: string
  Specials: string
  UnitImageAltText: string
  UnitImageURLs: string[]
  UnitStatus: string
  UnitTypeMapping: string
  VoyagerPropertyCode: string
  VoyagerPropertyId: string
}

/**
 * Type capturing an object with strings for key, and where values can be any
 * type.
 */
export type AnyObject = Record<string, any>

/**
 * Component children.
 */
export type Children = ReactChildren | ReactChildren[] | ReactNode | ReactNode[]

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

/* eslint-disable prettier/prettier */

export type FormSubmissionEvent = ChangeEvent<FormElement> &
  FormEvent<FormElement> &
  MouseEvent<HTMLElement> &
  MouseEvent<FormElement, MouseEvent<HTMLElement>> & {
    target: Target
  }

/* eslint-enable prettier/prettier */

export type FormSubmissionEventHandler = (
  form: InitialState,
  event?: FormSubmissionEvent
) => any

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T & Target
}

/**
 * The GlobalEventHandlers mixin describes the event handlers common to several
 * interfaces like HTMLElement, Document, or Window.
 *
 * These event handlers are defined on the GlobalEventHandlers mixin, and
 * implemented by HTMLElement, Document, Window, as well as by WorkerGlobalScope
 * for Web Workers.
 *
 * **https://developer.mozilla.org/docs/Web/API/GlobalEventHandlers**
 */
export interface GlobalEventHandlers {
  /**
   * Code to be called when the `blur` event is raised.
   */
  onBlur?(event)

  /**
   * Code to be called when the `error` event is raised.
   */
  onError?(event)

  /**
   * Code to be called when the `focus` event is raised.
   */
  onFocus?(event)

  /**
   * Code to be called when the `cancel` event is raised.
   */
  onCancel?(event)

  /**
   * Code to be called when the `change` event is raised.
   */
  onChange?(event)

  /**
   * Code to be called when the the `click` event is raised.
   */
  onClick?: React.MouseEventHandler

  /**
   * Code to be called when the the `close` event is raised.
   */
  onClose?(event)

  /**
   * Code to be called when the the `resize` event is raised.
   */
  onResize?(event)

  /**
   * Code to be called when the the `scroll` event is raised.
   */
  onScroll?(event)

  /**
   * Code to be called when the the `select` event is raised.
   */
  onSelect?(event)

  /**
   * Code to be called when the the `selectionchange` event is raised.
   */
  onSelectionChange?(event)

  /**
   * Code to be called when the the `submit` event is raised.
   */
  onSubmit?(event)
}

/**
 * Global attributes are attributes common to all HTML elements; they can be
 * used on all elements, though they may have no effect on some elements.
 *
 * The properties defined are the ones to be used by this application.
 *
 * **https://developer.mozilla.org/docs/Web/HTML/Global_attributes**
 */
export interface GlobalHTMLAttributes {
  /**
   * Provides a hint for generating a keyboard shortcut for the current element.
   *
   * This attribute consists of a space-separated list of characters.
   *
   * The browser should use the first one that exists on the computer keyboard
   * layout.
   */
  accessKey?: string

  /**
   * Non-standard attribute supported by WebKit on iOS (therefore nearly all
   * browsers running on iOS, including Safari, Firefox, and Chrome), which
   * controls whether and how the text value should be automatically capitalized
   * as it is entered/edited by the user.
   */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'

  /**
   * A space-separated list of the classes of the element.
   *
   * Classes allows CSS and JavaScript to select and access specific elements
   * via the class selectors or functions like the method
   * `Document.getElementsByClassName()`.
   */
  className?: string

  /**
   * An enumerated attribute indicating if the element should be editable by the
   * user. If so, the browser modifies its widget to allow editing.
   */
  contentEditable?: boolean

  /**
   * An enumerated attribute indicating the directionality of the element's
   * text.
   *
   * It can have the following values:
   *
   * - ltr, which means left to right and is to be used for languages that are
   *   written from the left to the right (like English);
   * - rtl, which means right to left and is to be used for languages that are
   *   written from the right to the left (like Arabic);
   * - auto, which lets the user agent decide. It uses a basic algorithm as it
   *   parses the characters inside the element until it finds a character with
   *   a strong directionality, then it applies that directionality to the whole
   *   element.
   */
  dir?: 'ltr' | 'rtl' | 'auto'

  /**
   * A Boolean attribute indicates that the element is not yet, or is no longer,
   * relevant.
   *
   * For example, it can be used to hide elements of the page that can't be used
   * until the login process has been completed. The browser won't render such
   * elements.
   *
   * This attribute must not be used to hide content that could legitimately be
   * shown.
   */
  hidden?: boolean

  /**
   * Defines a unique identifier (ID) which must be unique in the whole
   * document. Its purpose is to identify the element when linking (using a
   * fragment identifier), scripting, or styling (with CSS).
   */
  id?: string

  /* eslint-disable prettier/prettier */

  /**
   * Provides a hint to browsers as to the type of virtual keyboard
   * configuration to use when editing this element or its contents.
   *
   * Used primarily on `<input>` elements, but is usable on any element while in
   * contenteditable mode.
   */
  inputmode?:
  | 'none'
  | 'text'
  | 'decimal'
  | 'numeric'
  | 'tel'
  | 'search'
  | 'email'
  | 'url'

  /* eslint-enable prettier/prettier */

  /**
   * The unique, global identifier of an item.
   */
  itemid?: string

  /**
   * Used to add properties to an item. Every HTML element may have an itemprop
   * attribute specified, where an itemprop consists of a name and value pair.
   */
  itemprop?: string

  /**
   * itemscope (usually) works along with itemtype to specify that the HTML
   * contained in a block is about a particular item.
   *
   * itemscope creates the Item and defines the scope of the itemtype associated
   * with it.
   *
   * itemtype is a valid URL of a vocabulary (such as schema.org) that describes
   * the item and its properties context.
   */
  itemscope?: string

  /**
   * Specifies the URL of the vocabulary that will be used to define itemprops
   * (item properties) in the data structure.
   *
   * itemscope is used to set the scope of where in the data structure the
   * vocabulary set by itemtype will be active.
   */
  itemtype?: string

  /**
   * Helps define the language of an element?: the language that non-editable
   * elements are in, or the language that editable elements should be written
   * in by the user.
   *
   * The attribute contains one “language tag” (made of hyphen-separated
   * “language subtags”) in the format defined in Tags for Identifying Languages
   * (BCP47). xml:lang has priority over it.
   */
  lang?: string

  /**
   * An enumerated attribute defines whether the element may be checked for
   * spelling errors.
   *
   * It may have the following values:
   *
   * - true, which indicates that the element should be, if possible, checked
   *   for spelling errors;
   * - false, which indicates that the element should not be checked for
   *   spelling errors.
   */
  spellcheck?: boolean

  /**
   * Contains CSS styling declarations to be applied to the element. Note that
   * it is recommended for styles to be defined in a separate file or files.
   *
   * This attribute and the <style> element have mainly the purpose of allowing
   * for quick styling, for example for testing purposes.
   */
  style?: Record<string, string>

  /**
   * An integer attribute indicating if the element can take input focus (is
   * focusable), if it should participate to sequential keyboard navigation, and
   * if so, at what position.
   *
   * It can take several values:
   *
   * - a negative value means that the element should be focusable, but should
   *   not be reachable via sequential keyboard navigation;
   * - 0 means that the element should be focusable and reachable via sequential
   *   keyboard navigation, but its relative order is defined by the platform
   *   convention;
   * - a positive value means that the element should be focusable and reachable
   *   via sequential keyboard navigation; the order in which the elements are
   *   focused is the increasing value of the tabindex. If several elements
   *   share the same tabindex, their relative order follows their relative
   *   positions in the document.
   */
  tabindex?: number

  /**
   * Contains a text representing advisory information related to the element it
   * belongs to. Such information can typically, but not necessarily, be
   * presented to the user as a tooltip.
   */
  title?: string

  /**
   * An enumerated attribute that is used to specify whether an element's
   * attribute values and the values of its Text node children are to be
   * translated when the page is localized, or whether to leave them unchanged.
   *
   * It can have the following values:
   *
   * - empty string and yes, which indicates that the element will be
   *   translated.
   * - no, which indicates that the element will not be translated.
   */
  translate?: '' | 'no' | 'yes'
}

export type InitialState = Record<string, any>

/**
 * Type capturing null, undefined, and empty strings.
 */
export type NonExistent = '' | null | undefined

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
 * Type capturing primitive value types.
 */
export type Primitive = boolean | number | string

/**
 * Data that can be passed to all components.
 */
export type Props<T = AnyObject> = T & {
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
} & Partial<AriaAttributes & DOMAttributes<T> & GlobalEventHandlers>

/* eslint-enable prettier/prettier */

/**
 * Data that can be passed to components that render {@link Container}
 * components as wrappers around their children.
 */
export type PropsWithContainer<T = AnyObject> = Props<T> & {
  container?: boolean
}

/**
 * Data that can be passed to components that handle list items, such as
 * {@link List} or {@link Menu}.
 */
export type PropsWithItems<T = AnyObject> = Omit<Props<T>, 'children'> & {
  /**
   * Initial items data.
   *
   * @default []
   */
  initialItems?: OptionProps[] | string[] | number[] | AnyObject[]
}

/**
 * Data that can be passed to components that handle user options, such as
 * {@link OptGroup} or {@link Select}.
 */
export type PropsWithOpts<T = AnyObject> = Omit<Props<T>, 'children'> & {
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

export type PropsWithReqChildren<T = AnyObject> = Omit<Props<T>, 'children'> & {
  children: Children
}

/**
 * Event target type.
 */
export type Target = EventTarget & {
  dataset: Record<string, any>
}

export type VoidElementTagProps<T = AnyObject> = Omit<
  Props<T>,
  'children' | 'dangerouslySetInnerHTML'
>

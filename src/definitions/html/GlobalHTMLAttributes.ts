/**
 * @file Type Definitions - Global HTML Attributes
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes}
 */

/**
 * Global attributes are attributes common to all HTML elements; they can be
 * used on all elements, though they may have no effect on some elements.
 *
 * The properties defined are the ones to be used by this application.
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

export default GlobalHTMLAttributes

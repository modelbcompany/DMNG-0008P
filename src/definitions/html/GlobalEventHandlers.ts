/**
 * @file Type Definitions - GlobalEventHandlers mixin
 * @see {@link https://developer.mozilla.org/docs/Web/API/GlobalEventHandlers}
 */

/**
 * The GlobalEventHandlers mixin describes the event handlers common to several
 * interfaces like HTMLElement, Document, or Window.
 *
 * These event handlers are defined on the GlobalEventHandlers mixin, and
 * implemented by HTMLElement, Document, Window, as well as by WorkerGlobalScope
 * for Web Workers.
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

export default GlobalEventHandlers

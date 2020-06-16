import $ from 'jquery'
import { mergeStrings } from './strings.utils'
import { isNumber, isString } from './validation.utils'

/**
 * @file Utilities - UI
 * @module utils/ui
 */

/**
 * Animates the scrolling of the page to the top of @see @param selector .
 *
 * @see {@link https://api.jquery.com/category/selectors/}
 *
 * @param {MouseEvent} event - Event object passed to the `click` event
 * @returns {undefined}
 */
export const animateScroll = event => {
  const {
    target: { value }
  } = event

  const { to, duration } = JSON.parse(value)

  $('html, body').animate(
    {
      scrollTop: $(isString(to) || 'body').offset().top
    },
    isNumber(duration) || 300
  )

  event.preventDefault()
}

/**
 * Takes any number of class names and concats them together.
 * Duplicate class names, 'null', and 'undefined' will be removed.
 *
 * @param {string} arguments
 * @returns {string}
 */
export const classNames = function (...rest) {
  return mergeStrings(rest).replace('null', '').replace('undefined', '').trim()
}

/**
 * Opens the dropdown menu selected by @param event.target.value .
 *
 * @param {MouseEvent} event - Event object passed to the `click` event
 * @param {Function} cb - A function to call after the dropdown is handled
 * @returns {object} Object containing clicked element and a boolean value
 * representing the open state of the dropdown menu. If true, the menu has the
 * class 'is-collapsed'.
 */
export const handleDropdown = function ({ target }, cb) {
  const { value: id } = target

  const $dropdowns = $('.dropdown-list').not(id)
  const $menu = $(`.dropdown-list${id}`)
  const toggle = 'is-collapsed'
  let collapsed = $menu.hasClass(toggle)

  $menu.toggleClass(toggle, !$menu.hasClass(toggle), 300, null, () => {
    $dropdowns.addClass(toggle, 100)
  })

  // Reset collapsed value
  collapsed = $menu.hasClass(toggle)

  // Update Dropdown attribute
  $menu.parent().attr('data-collapsed', collapsed)

  if (cb) return cb(target, collapsed)
  return { target, collapsed }
}

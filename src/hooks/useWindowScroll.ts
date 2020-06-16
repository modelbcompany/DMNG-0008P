import $ from 'jquery'

/**
 * @file useWindowScroll Hook
 * @module hooks/useWindowScroll
 */

/**
 * When the user scrolls the page, the <body> element will be updated with the
 * global 'is-scrolling' class.
 *
 * If a page has a hero, the 'is-scrolling' class won't be applied until the
 * user has passed the hero. Otherwise, the class won't be applied until the
 * user has passed the height of the page header.
 *
 * @param {boolean} hero - True if the page has a hero
 * @returns {boolean} True if scroll height of hero or header
 */
export const useWindowScroll = (hero: boolean): boolean => {
  // Constants
  const $BODY: any = $('body')
  const $WINDOW: any = $(window)
  const SCROLLING_CLASS = 'is-scrolling'

  // If the page has a hero, don't apply the 'is-scrolling' class until
  // we've passed the height of the hero
  const has_hero =
    hero && $WINDOW.scrollTop() >= ($('.ado-hero') as any).height()

  // If the page doesn't have a hero, don't apply the 'is-scrolling' class
  // until we've passed the height of the header
  const no_hero =
    !hero && $WINDOW.scrollTop() >= ($('.ado-header') as any).height()

  // True if we've passed hero height or header height
  const scrolling = has_hero || no_hero

  // Add 'is-scrolling' class to <body>
  $BODY[`${scrolling ? 'add' : 'remove'}Class`](SCROLLING_CLASS)

  // Return window scroll value
  return scrolling
}

export default useWindowScroll

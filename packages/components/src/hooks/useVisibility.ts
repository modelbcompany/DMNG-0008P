// React
import { useCallback } from 'react'
import useBoolean from './useBoolean'

/**
 * @file Toggle element visibility
 * @module hooks/useVisibility
 */

/**
 * Returns an object containing a boolean indicating component visibility, and
 * two functions to update the state.
 *
 * @param {boolean} initialVisibility - Initial visibility state
 * @returns {object}
 */
export const useVisibility = (initialVisibility = true) => {
  const {
    boolean: visible,
    setBoolean: setVisibility,
    toggle: toggleVisibility
  } = useBoolean(initialVisibility)

  return {
    hide: useCallback(() => setVisibility(false), []),
    setVisibility,
    show: useCallback(() => setVisibility(true), []),
    toggleVisibility,
    visible
  }
}

export default useVisibility

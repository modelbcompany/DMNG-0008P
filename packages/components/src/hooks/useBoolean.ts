import { useCallback, useState } from 'react'

/**
 * @file Boolean value hook
 * @module hooks/useBoolean
 */

/**
 * Takes @param initial as the starting boolean value, and provides methods to
 * toggle the boolean value.
 *
 * @param {boolean} initial - Default boolean value
 * @returns {Object} Current boolean value and a method to toggle the value
 */
export const useBoolean = (initialValue: boolean) => {
  const [boolean, setBoolean] = useState(initialValue)

  return {
    boolean,
    setBoolean: (value: boolean) => setBoolean(value),
    setFalse: () => setBoolean(false),
    setTrue: () => setBoolean(true),
    toggle: useCallback(() => setBoolean(bool => !bool), [])
  }
}

export default useBoolean

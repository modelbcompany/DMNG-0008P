import { useCallback, useState } from 'react'
import { isArray, isNumber } from '../utils'

/**
 * @file Execute array related tasks
 * @module hooks/useArray
 */

/**
 * Takes @param initial as the initial array value and provides methods to
 * modify the array.
 *
 * @param {Array} initial - Initial array value
 * @returns {Object} Current array value and methods to mutate the array
 */
export const useArray = initial => {
  const [array, setArray] = useState(isArray(initial) || [])

  return {
    add: useCallback(
      value =>
        setArray(arr => (isArray(value) ? arr.concat(value) : [...arr, value])),
      []
    ),
    addAll: useCallback(value => setArray(arr => arr.concat(value)), []),
    array,
    clear: useCallback(() => setArray(() => []), []),
    empty: array.length === 0,
    setArray: arr => setArray(isArray(arr) || []),
    removeByIndex: useCallback(
      index =>
        setArray(arr => {
          arr.splice((isNumber(index) as number) || -1, 1)
          return arr
        }),
      []
    ),
    removeByKeyValue: useCallback(value => {
      setArray(arr => arr.filter(arrVal => arrVal?.key !== value))
    }, [])
  }
}

export default useArray

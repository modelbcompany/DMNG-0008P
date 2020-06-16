import { useCallback, useState } from 'react'
import { isArray } from '../utils'

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
export function useArray<T = any>(initial: T[]) {
  const [array, setArray] = useState(isArray(initial) || [])

  return {
    add: useCallback((value: T | T[]) => {
      const arrValue = isArray(value)
        ? array.concat(value as never)
        : [...array, value]
      setArray(arrValue as never[])
    }, []),
    addAll: useCallback(value => setArray(arr => arr.concat(value)), []),
    array,
    clear: useCallback(() => setArray(() => []), []),
    empty: array.length === 0,
    removeByIndex: useCallback((index: number) => {
      setArray(array.splice(index, 1))
    }, []),
    removeByKeyValue: useCallback(value => {
      setArray(arr => arr.filter(arrVal => (arrVal as any)?.key !== value))
    }, []),
    setArray: (arr: unknown[]) => setArray(isArray(arr) || [])
  }
}

export default useArray

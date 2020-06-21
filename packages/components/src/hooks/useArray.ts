import { useCallback, useState } from 'react'

/**
 * @file Execute array related tasks
 * @module hooks/useArray
 */

/**
 * Takes @param initialValue as the initialValue array value and provides methods to
 * modify the array.
 *
 * @param {Array} initialValue - Initial array value
 * @returns {Object} Current array value and methods to mutate the array
 */
export function useArray<T = any>(initialValue?: T[] | null) {
  const [array, setArray] = useState(initialValue || null)

  return {
    add: useCallback(
      value => setArray(prevArr => (prevArr ? [...prevArr, value] : [value])),
      [setArray]
    ),
    addAll: useCallback(
      value => setArray(arr => (arr ? [...arr.concat(value)] : value)),
      [setArray]
    ),
    array: array || [],
    clear: useCallback(() => setArray(() => []), [setArray]),
    empty: !array || (array && array.length === 0),
    removeByIndex: useCallback(
      (index: number) => {
        setArray(prevArr => (prevArr ? [...prevArr.splice(index, 1)] : []))
      },
      [setArray]
    ),
    removeByKeyValue: useCallback(
      value => {
        setArray(prevArr => {
          if (!prevArr) return []

          return prevArr.filter(arrVal => (arrVal as any)?.key !== value)
        })
      },
      [setArray]
    ),
    setArray: useCallback(
      (newArray: unknown[]) => setArray([...newArray] as T[]),
      [setArray]
    )
  }
}

export default useArray

import { OptionProps, Primitive } from 'definitions'
import { useEffect } from 'react'
import { isPrimitive } from 'util'
import useArray from './useArray'
import useObject from './useObject'

/**
 * @file Hook to retreive collection of {@link Option} data
 * @module hooks/useOptions
 */

/**
 * {@link useOptions} return value.
 */
export type UseOptionsState = {
  /**
   * `Option` component data.
   */
  options: OptionProps[]

  /**
   * Currently selected option.
   */
  selected: OptionProps | null

  /**
   * Sets the `options` state.
   */
  setOptions: React.Dispatch<any>

  /**
   * Sets the `selected` state.
   */
  setSelcted: React.Dispatch<any>
}

/**
 * Returns an object containing an array of {@link Option} properties, the
 * selected option, a function to update the currently selected option, and a
 * function to update the options array.
 *
 * @param initialOptions
 */
export const useOptions = (
  initialOptions: Primitive[] | Record<string, any>[] = []
): UseOptionsState => {
  const { array, setArray } = useArray(initialOptions)
  const { object, setObject } = useObject(array.find(option => option.selected))

  useEffect(() => {
    setArray(
      array.map((option: Primitive | Record<string, any>) => {
        if (!isPrimitive(option)) return option
        return { label: option, value: option }
      })
    )
  }, [])

  return {
    options: array,
    selected: Object.keys(object).length ? object : null,
    setOptions: setArray,
    setSelcted: setObject
  }
}

export default useOptions

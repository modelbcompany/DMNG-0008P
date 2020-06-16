import _ from 'lodash'
import { useCallback, useState } from 'react'
import { isObject } from 'utils'

/**
 * @file Use Object as state variable
 * @module hooks/useObject
 */

/**
 * Takes @param initial as the initial object value and provides methods to
 * modify the object.
 *
 * @param {Object} initial - Initial object value
 * @returns {Object} Current object value and methods to mutate the object
 */
export const useObject = initial => {
  const [object, setObject] = useState(isObject(initial) || {})

  return {
    copy: Object.assign({}, object),
    empty: Object.values(object).length === 0,
    keys: Object.keys(object),
    merge: useCallback(o => setObject(state => ({ ...state, ...o })), []),
    object,
    setObject,
    sort: useCallback(
      () =>
        setObject(state => {
          // Create object to hold sorted keys
          const sorted = {}

          // Sort keys and copy to empty object
          Object.keys(state)
            .sort()
            .forEach(key => {
              if (key) sorted[key] = state[key]
            })

          // Return sorted object
          return Object.assign({}, sorted)
        }),
      [setObject]
    ),
    updateObject: useCallback(
      (path, value) => {
        return setObject(state => _.set(state, path, value))
      },
      [setObject]
    ),
    values: Object.values(object)
  }
}

export default useObject

import { isArray, isObject, isString } from './validation.utils'

/**
 * @file Utilities - Strings
 * @module utils/string
 */

/**
 * Takes any of strings and concats them together.
 * Duplicate strings will be removed.
 *
 * @param {string} arguments
 * @returns {string}
 */
export const mergeStrings = function (...rest) {
  const strings = Object.values(rest)
    .map(arg => {
      if (isArray(arg)) {
        return mergeStrings(...arg)
      } else if (isObject(arg)) {
        return mergeStrings(...Object.values(arg))
      }

      const strings = new Set((isString(arg) || '').split(' '))

      return [...((strings as unknown) as string[])]
    })
    .flat()
    .filter(string => !!string)
    .filter(string => string.trim())

  let string = ''

  if (!strings.length) return string

  strings.forEach(str => (string += ` ${str}`))

  return string.trim()
}

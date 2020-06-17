import { AnyObject } from 'declarations'

/**
 * @file Utility Functions
 * @module utils
 */

/**
 * Takes any number of class names and concats them together.
 * Duplicate class names, 'null', and 'undefined' will be removed.
 *
 * @param args
 */
export function classNames(...args: string[]): string {
  return mergeStrings((args as unknown) as string)
    .replace('null', '')
    .replace('undefined', '')
    .trim()
}

/**
 * Checks if @param data is an array.
 *
 * @param data - Data to validate
 * @returns @param data if it is an array, or null
 */
export const isArray = (data: unknown): [] | null =>
  Array.isArray(data) ? (data as []) : null

/**
 * Checks if @param data is a true object ({}).
 *
 * @param data - Data to validate
 * @returns True if @param data is an object ({})
 */
export const isObject = (data: any): any => {
  return data === Object(data) && !isArray(data) ? (data as AnyObject) : null
}

/**
 * Checks if @param data is a string.
 *
 * @param data - Data to validate
 * @returns @param data if a string, null otherwise
 */
export const isString = (data: unknown): string | null => {
  return typeof data === 'string' ? (data as string) : null
}

/**
 * Takes any of strings and concats them together.
 * Duplicate strings will be removed.
 *
 * @param args
 */
export function mergeStrings(...args: string[]): string {
  const strings = Object.values(args)
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

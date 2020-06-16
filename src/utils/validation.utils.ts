/**
 * @file Utilities - Data Validation
 * @module utils/validation
 */

/**
 * Checks if @param data is an array.
 *
 * @param {*} data - Data to validate
 * @returns {[] | null} @param data if it is an array, or null
 */
export const isArray = data => (Array.isArray(data) ? data : null)

/**
 * Checks if @param data is a boolean.
 *
 * @param {*} data - Data to validate
 * @returns {number | null} @param data if a boolean, null otherwise
 */
export const isBoolean = data => {
  return typeof data === 'boolean' || data instanceof Boolean ? data : null
}

/**
 * Checks if @param data is a true object ({}).
 *
 * @param {*} data - Data to validate
 * @returns {boolean} True if @param data is an object ({})
 */
export const isObject = data => {
  return data === Object(data) && !isArray(data) ? data : null
}

/**
 * Checks if @param data is a number.
 *
 * @param {*} data - Data to validate
 * @returns {number | null} @param data if a number, null otherwise
 */
export const isNumber = data => {
  return typeof data === 'number' || data instanceof Number ? data : null
}

/**
 * Checks if @param data is a string.
 *
 * @param {*} data - Data to validate
 * @returns {string | null} @param data if a string, null otherwise
 */
export const isString = data => {
  return typeof data === 'string' || data instanceof String ? data : null
}

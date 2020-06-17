import pkg from '../package.json'

/**
 * @file Service Mixins
 * @module lib/mixins
 */

/**
 * Retrieves the version of the API from `package.json`.
 */
export const apiVersion = (): string => pkg.version

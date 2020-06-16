import pino from 'pino'

/**
 * @file Pino Configuration
 * @module logger
 */

/**
 * Logger singleton.
 *
 * @namespace {pino.Logger} Logger
 */
export const Logger = pino({
  browser: {
    asObject: true
  },
  level: 'debug'
})

Logger.debug({ pino: true })

export default Logger

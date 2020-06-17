import pino from 'pino'

/**
 * @file Pino Configuration
 * @module logger
 */

/**
 * logger singleton.
 *
 * @namespace {pino.logger} logger
 */
export const logger = pino({
  browser: {
    asObject: true
  },
  level: 'debug'
})

logger.debug({ pino: true })

export default logger

/**
 * NOTICE: Disabling @typescript-eslint/no-var-requires
 *
 * @fix `pino__WEBPACK_IMPORTED_MODULE_0___default() is not a function`
 * @see https://github.com/pinojs/pino/issues/543
 */

/* eslint-disable @typescript-eslint/no-var-requires */

const pino = require('pino')

/* eslint-enable @typescript-eslint/no-var-requires */

/**
 * @file Pino Configuration
 * @module logger
 */

/**
 * Logger singleton.
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

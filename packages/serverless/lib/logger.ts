import pino from 'pino'

/**
 * @file Pino Configuration
 * @module logger
 */

/**
 * logger singleton.
 */
export const logger = pino({
  level: 'debug',
  prettyPrint: {
    colorize: true,
    errorProps: 'className,code,data,errors,message,name',
    levelFirst: true,
    translateTime: true
  }
})

logger.debug({ level: 'debug', pino: true })

export default logger

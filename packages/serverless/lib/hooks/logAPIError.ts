import { HookContext } from '../declarations'
import logger from '../logger'

/**
 * @file Logs API errors
 * @module hooks/logAPIError
 * @see {@link https://docs.feathersjs.com/api/hooks.html#hook-context}
 */

/**
 * Logs an API error. If {@param context.error.type} isn't FeathersError,
 * {@param context.error} will be converted into a `GeneralError`.
 *
 * @param context - Information about the service method call
 * @param context.error - Error object that was thrown in a failed method call
 * @param context.error.type - Error type
 * @param context.service - Service the hook currently runs on
 * @returns Updated hook context
 */
export const logAPIError = (context: HookContext): HookContext => {
  if (context.error.type !== 'FeathersError') {
    context.error = context.service.error(context.error)
  }

  logger.error({ logAPIError: context.error.toJSON() })

  return context
}

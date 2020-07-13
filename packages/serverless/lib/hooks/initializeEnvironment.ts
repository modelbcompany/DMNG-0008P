import { pick } from 'lodash'
import { HookContext } from '../declarations'

/**
 * @file Attaches the authentication environment variables to the request
 * @module hooks/initializeEnvironment
 * @see {@link https://docs.feathersjs.com/api/hooks.html#hook-context}
 */

/**
 * Attaches the authentication environment variables to the request.
 *
 * @param context - Information about the service method call
 * @returns Updated hook context
 */
export const initializeEnvironment = (context: HookContext): HookContext => {
  context.params.authentication = pick(process.env, [
    'apiToken',
    'companyCode',
    'marketingAPIKey',
    'password',
    'propertyId',
    'username'
  ])

  return context
}

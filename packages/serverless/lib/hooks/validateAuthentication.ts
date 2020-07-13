import { HookContext } from '../declarations'
import { getFeathersError } from '../utils'

/**
 * @file Verify existence of authentication credentials
 * @module hooks/validateAuthentication
 */

/**
 * Authenticates the incoming request.
 *
 * If any credentials are not defined in {@param context.params.authentication},
 * a `NotAuthenticated` error will be thrown.
 *
 * @param context - Information about the service method call
 * @param context.params - Service method parameters
 * @param context.params.authentication - RENTCafé API credentials
 * @param context.params.authentication.apiToken
 * @param context.params.authentication.companyCode
 * @param context.params.authentication.marketingAPIKey
 * @param context.params.authentication.password
 * @param context.params.authentication.propertyId
 * @param context.params.authentication.username
 * @returns Updated hook context
 * @throws {NotAuthenticated}
 */
export const validateAuthentication = (context: HookContext): HookContext => {
  const {
    params: { authentication, query },
    data,
    method,
    path
  } = context

  const authErrorMessages = {
    apiToken: 'Missing RENTCafé API token',
    companyCode: 'Missing company code',
    marketingAPIKey: 'Missing RENTCafé Marketing API key',
    password: 'Missing RENTCafé password',
    propertyId: 'Missing property ID',
    username: 'Missing RENTCafé username'
  }

  if (!authentication) {
    throw getFeathersError(
      'Missing all RENTCafé API credentials',
      {
        data,
        errors: { authentication: null },
        method,
        params: { query },
        path
      },
      401
    )
  }

  Object.keys(authErrorMessages).forEach(key => {
    if (!authentication[key]) {
      throw getFeathersError(
        authErrorMessages[key],
        {
          data,
          errors: { [key]: null },
          method,
          params: { query },
          path
        },
        401
      )
    }
  })

  return context
}

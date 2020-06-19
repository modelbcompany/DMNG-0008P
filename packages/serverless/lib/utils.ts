import {
  BadGateway,
  BadRequest,
  Conflict,
  Forbidden,
  GeneralError,
  LengthRequired,
  MethodNotAllowed,
  NotAcceptable,
  NotAuthenticated,
  NotFound,
  NotImplemented,
  PaymentError,
  Timeout,
  TooManyRequests,
  Unavailable,
  Unprocessable
} from '@feathersjs/errors'
import { isArray, isNumber } from 'lodash'
import {
  AnyObject,
  Application,
  AxiosResponse,
  FeathersError,
  HooksObject
} from './declarations'
import logger from './logger'
import RentCafeAPIError from './models/RentCafeAPIError'

/**
 * @file Utility Functions
 * @module lib/utils
 */

/**
 * Creates a new Feathers error based on the status argument.
 *
 * @param error - Error to transform or error message
 * @param data - Additional error data
 * @param data.errors - Typically validation errors or if you want to group
 * multiple errors together
 * @param status - Error status code. Defaults to 500
 * @returns {FeathersError}
 */
export const getFeathersError = (
  error?: string | Error,
  data: AnyObject = {},
  status = 500
): FeathersError => {
  switch (status) {
    case 400:
      error = new BadRequest(error, data)
      break
    case 401:
      error = new NotAuthenticated(error, data)
      break
    case 402:
      error = new PaymentError(error, data)
      break
    case 403:
      error = new Forbidden(error, data)
      break
    case 404:
      error = new NotFound(error, data)
      break
    case 405:
      error = new MethodNotAllowed(error, data)
      break
    case 406:
      error = new NotAcceptable(error, data)
      break
    case 408:
      error = new Timeout(error, data)
      break
    case 409:
      error = new Conflict(error, data)
      break
    case 411:
      error = new LengthRequired(error, data)
      break
    case 422:
      error = new Unprocessable(error, data)
      break
    case 429:
      error = new TooManyRequests(error, data)
      break
    case 501:
      error = new NotImplemented(error, data)
      break
    case 502:
      error = new BadGateway(error, data)
      break
    case 503:
      error = new Unavailable(error, data)
      break
    default:
      error = new GeneralError(error, data)
  }

  return error as FeathersError
}

/**
 * Axios interceptor for RENTCafé responses.
 * Used to check for an error from a RENTCafé response.
 *
 * @param param0 - Axios Response object
 * @returns Axios response if an error isn't found
 * @throws {RentCafeAPIError}
 */
export const interceptRentCafeResponse = ({
  data: res,
  config,
  ...rest
}: AxiosResponse): AxiosResponse => {
  if (!res) return { ...rest, config, data: null }

  const marketing = isNumber(res.ErrorCode)
  const web = isArray(res) && res[0]?.Error

  if (web) res = res[0]

  if (marketing || web) {
    const { method, url, data } = config

    const error = new RentCafeAPIError(res, { config: { method, url, data } })

    logger.error({ interceptRentCafeResponse: error })
    throw error
  }

  return res
}

/**
 * Registers a Feathers service.
 *
 * @param app - Feathers application
 * @param name - Service name
 * @param register - Function register service
 * @param hooks - Service hooks
 */
export const registerService = (
  app: Application,
  name: string,
  register: (app: Application) => any,
  hooks?: HooksObject
): void => {
  const path = app.get('services')[name]

  app.use(path, register(app))

  if (hooks) app.service(path).hooks(hooks)
}

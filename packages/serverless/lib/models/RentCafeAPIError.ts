import { FeathersError } from '@feathersjs/errors'
import { AnyObject } from 'lib/declarations'

/**
 * @file Custom FeathersError
 * @module lib/models/RentCafeAPIError
 */

/**
 * If a request to the RENTCafé Web APIs fails, it will return an object with
 * the property `Error`.
 *
 * @namespace RentCafeWebAPIErrorCodes
 * @see {@link https://woodmontapi.modelb.now.sh/docs/rentcafe/web}
 */
export const RentCafeWebAPIErrorCodes: Readonly<string[]> = Object.freeze([
  '1000',
  '1010',
  '1020',
  '1030',
  '1040',
  '1050',
  '1060',
  '1070',
  '1100'
])

/**
 * @class RentCafeAPIError
 * @extends FeathersError
 */
export class RentCafeAPIError extends FeathersError {
  /**
   * Converts a RENTCafé API error into a FeathersError.
   *
   * @param error - RENTCafé API error object
   * @param data - Additional data to include with the error
   */
  constructor(error: AnyObject, data: AnyObject = {}) {
    const {
      Error: webErrCode,
      ErrorCode: marketingErrCode,
      ErrorMessage
    } = error

    const code = webErrCode || marketingErrCode
    let message = ''
    let status = 400

    switch (code) {
      case '1000':
        message = 'Invalid Credentials'
        status = 401
        break
      case '1010':
        message = 'Invalid Company'
        break
      case '1020':
        message = 'Invalid Property'
        break
      case '1030':
        message = 'Invalid Request Type'
        break
      case '1040':
        message = 'Invalid User'
        status = 401
        break
      case '1050':
        message = 'No data found for company / property'
        break
      case '1060':
        message = 'No active property found for the property'
        break
      case '1070':
        message = 'Property not configured for API'
        status = 401
        break
      case '1100':
        message = 'Other Error'
        status = 500
        break
      default:
        message = ErrorMessage
    }

    data.code = code
    data.docs = webErrCode
      ? 'https://woodmontapi.modelb.now.sh/docs/rentcafe/web'
      : 'https://woodmontapi.modelb.now.sh/docs/rentcafe/marketing'

    super(message, 'RentCafeAPIError', status, 'rent-cafe-api-error', data)
  }
}

export default RentCafeAPIError

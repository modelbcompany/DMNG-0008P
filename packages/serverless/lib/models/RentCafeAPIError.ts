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
    const { Error: webErrCode, ErrorCode: marketingErrCode } = error

    const code = webErrCode || marketingErrCode
    let message = ''

    switch (code) {
      case '1000':
        message = 'Invalid Credentials'
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
        break
      case '1050':
        message = 'No data found for company / property'
        break
      case '1060':
        message = 'No active property found for the property'
        break
      case '1070':
        message = 'Property not configured for API'
        break
      case '1100':
        message = 'Other Error'
        break
      default:
        message = 'Unknown RENTCafé API error'
    }

    data.code = code
    data.docs = webErrCode
      ? 'https://woodmontapi.modelb.now.sh/docs/rentcafe/web'
      : 'https://woodmontapi.modelb.now.sh/docs/rentcafe/marketing'

    // ! Regardless of success, the RENT Café API ALWAYS responds with a 200
    // ! status code.
    super(message, 'RentCafeAPIError', 200, 'rent-cafe-api-error', data)
  }
}

export default RentCafeAPIError

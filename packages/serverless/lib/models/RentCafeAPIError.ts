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
export const RentCafeWebAPIErrorCodes: Readonly<number[]> = Object.freeze([
  1000,
  1010,
  1020,
  1030,
  1040,
  1050,
  1060,
  1070,
  1100
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
    let { ErrorMessage } = error

    if (webErrCode) {
      ErrorMessage = (() => {
        const message = RentCafeWebAPIErrorCodes.find(code => {
          let msg = ''

          if (code === webErrCode) {
            switch (webErrCode) {
              case 1010:
                msg = 'Invalid Company'
                break
              case 1020:
                msg = 'Invalid Property'
                break
              case 1030:
                msg = 'Invalid Request Type'
                break
              case 1040:
                msg = 'Invalid User'
                break
              case 1050:
                msg = 'No data found for company / property'
                break
              case 1060:
                msg = 'No active property found for the property'
                break
              case 1070:
                msg = 'Property not configured for API'
                break
              case 1100:
                msg = 'Other Error'
                break
              default:
                msg = 'Invalid Credentials'
            }
          }

          return msg
        })

        return message || 'Unknown RENTCafé API error'
      })()
    }

    data.code = webErrCode || marketingErrCode
    data.docs = webErrCode
      ? 'https://woodmontapi.modelb.now.sh/docs/rentcafe/web'
      : 'https://woodmontapi.modelb.now.sh/docs/rentcafe/marketing'

    // ! Regardless of success, the RENT Café API ALWAYS responds with a 200
    // ! status code.
    super(ErrorMessage, 'RentCafeAPIError', 200, 'rent-cafe-api-error', data)
  }
}

export default RentCafeAPIError

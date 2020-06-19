import configuration from '@feathersjs/configuration'
import express from '@feathersjs/express'
import feathers from '@feathersjs/feathers'
import cors from 'cors'
import { merge } from 'lodash'
import {
  Application,
  HookContext,
  Query,
  RentCafeAuthentication
} from './declarations'
import logger from './logger'
import * as mixins from './mixins'
import services from './services'
import { getFeathersError } from './utils'

/**
 * @file Feathers App Configuration
 * @module lib/app
 */

export let app: Application = express(feathers())

// Load app configuration
app.configure(configuration())

// Configure additional constants
app.set('logger', logger)

// Enable CORS and body parsing
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// TODO: Add middleware
// app.configure(middleware)
// app.configure(authentication)

// ! Mixins have to be added before registering any services
app.mixins.push(service => {
  for (const key in mixins) service[key] = mixins[key]
})

// Set up our services (see `./services/index.ts`)
app = app.configure(services).setup()

// Initialize hooks
app.hooks({
  before: {
    all: [
      /**
       * Attaches the authentication environment variables to the request.
       *
       * @param param0 - Service call information
       * @param param0.params - Service method parameters
       * @param param0.params.query - Query parameters
       * @returns Updated service context
       */
      ({ params, ...rest }): HookContext => {
        const {
          apiToken,
          companyCode,
          marketingAPIKey,
          propertyId
        } = process.env

        return {
          ...rest,
          params: {
            ...params,
            authentication: {
              apiToken,
              companyCode,
              marketingAPIKey,
              propertyId
            }
          }
        }
      },

      /**
       * Authenticates the incoming request.
       *
       * If credentials are not defined in @param param0.params.authentication,
       * a `NotAuthenticated` error will be thrown.
       *
       * @param param0 - Service call information
       * @param param0.params - Service method parameters
       * @param param0.params.authentication - RENTCafé API credentials
       * @param param0.params.authentication.apiToken
       * @param param0.params.authentication.companyCode
       * @param param0.params.authentication.marketingAPIKey
       * @param param0.params.authentication.propertyId
       * @returns Updated context
       * @throws {FeathersError.NotAuthenticated}
       */
      ({
        params: { authentication, ...params },
        data,
        method,
        path,
        ...rest
      }: HookContext): HookContext => {
        const authErrorMessages = {
          apiToken: 'Missing RENTCafé API token',
          companyCode: 'Missing company code',
          marketingAPIKey: 'Missing RENTCafé Marketing API key',
          propertyId: 'Missing property ID'
        }

        if (!authentication) {
          throw getFeathersError(
            'Missing all RENTCafé API credentials',
            {
              data,
              errors: { authentication: null },
              method,
              params: { query: params.query },
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
                params: { query: params.query },
                path
              },
              401
            )
          }
        })

        return {
          ...rest,
          data,
          method,
          params: { ...params, authentication },
          path
        }
      },

      /**
       * Attaches the RENTCafé API credentials to the incoming query based on
       * service path.
       *
       * @param param0 - Service call information
       * @param param0.path - Service initialization path (no slashes)
       * @param param0.params - Service method parameters
       * @param param0.params.authentication - RENTCafé API credentials
       * @param param0.params.authentication.apiToken
       * @param param0.params.authentication.companyCode
       * @param param0.params.authentication.marketingAPIKey
       * @param param0.params.authentication.propertyId
       * @param param0.params.query - Query parameters
       * @returns Updated context
       */
      ({ params, path, ...rest }: HookContext): HookContext => {
        const {
          apiToken,
          companyCode,
          marketingAPIKey,
          propertyId
        } = params.authentication

        if (path === 'apartments' || path === 'floorplans') {
          params.query = merge({}, params.query, {
            apiToken,
            propertyId,
            requestType:
              path === 'apartments' ? 'apartmentAvailability' : 'floorPlan'
          })
        } else if (path === 'scheduling') {
          params.query = merge({}, params.query, {
            companyCode,
            marketingAPIKey,
            propertyId
          })
        }

        return { params, path, ...rest }
      },

      /**
       * Updates the value of @param context.params.url based on the value of
       * @param context.path and @param context.params.query .
       *
       * Our service methods will use @param context.params.url when
       * requesting the RENTCafé APIs.
       *
       * ! Our project uses Axios, allowing us to attach the search parameters
       * ! as an object, but the RENTCafé API has only successfully responded
       * ! when the credential query parameters were part of the URL string.
       * ! The latter is the current workaround for this issue.
       *
       * @param context - Service call information
       * @param context.path - Path service is initialized on
       * @param context.params - Service method parameters
       * @param context.params.query - Query parameters
       * @returns Updated @param context
       */
      ({ path, params, ...rest }: HookContext): HookContext => {
        const {
          apiToken,
          companyCode,
          marketingAPIKey,
          propertyId,
          requestType,
          ...query
        } = params.query as Query & RentCafeAuthentication

        let url = ''

        if (path !== 'scheduling') {
          url = `https://api.rentcafe.com/rentcafeapi.aspx?requestType=${requestType}&apiToken=${apiToken}&propertyId=${propertyId}`
        } else {
          url = `https://marketingapi.rentcafe.com/marketingapi/api/appointments/${requestType}?companyCode=${companyCode}&marketingAPIKey=${marketingAPIKey}&propertyId=${propertyId}`
        }

        return { ...rest, params: { ...params, query, url }, path }
      }
    ]
  },

  error({ error, ...rest }) {
    logger.error({ api: error.toJSON ? error.toJSON() : error.message })
    return { error, ...rest }
  }
})

export default app

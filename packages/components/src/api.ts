import feathers from '@feathersjs/client'
import rest from '@feathersjs/rest-client'
import axios from 'axios'
import logger from 'logger'

/**
 * @file API Connection Configuration
 * @module api
 */

// Initialize client side Feathers app
const api = feathers()

// Connect to API and configure REST client
api.configure(rest(process.env.STORYBOOK_API_URL).axios(axios))

logger.debug({ connected: process.env.STORYBOOK_API_URL })

export default api

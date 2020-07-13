import {
  initializeEnvironment,
  logAPIError,
  removeAPIPrefix,
  validateAuthentication
} from './hooks'

/**
 * @file Application hooks that run for every service
 * @module lib/hooks
 * @see {@link https://docs.feathersjs.com/api/hooks.html#application-hooks}
 */

/* eslint-disable sort-keys */

export default {
  before: {
    all: [removeAPIPrefix, initializeEnvironment, validateAuthentication],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [logAPIError],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}

/* eslint-enable sort-keys */

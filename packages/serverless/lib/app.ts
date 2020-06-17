import configuration from '@feathersjs/configuration'
import express from '@feathersjs/express'
import feathers from '@feathersjs/feathers'
import cors from 'cors'
import { Application } from './declarations'
import logger from './logger'
import * as mixins from './mixins'
import services from './services'

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

// TODO: Initialize hooks

export default app

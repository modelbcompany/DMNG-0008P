import { Application } from '../declarations'
import Docs from './docs'

/**
 * @file Services
 * @module lib/services
 */

/**
 * Array of services to configure.
 */
export const services = [Docs]

/**
 * Configures the library services.
 *
 * @param app - Feathers application
 */
export default (app: Application): void => {
  services.forEach(service => app.configure(service))
}

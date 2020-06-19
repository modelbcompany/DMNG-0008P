import { Application } from '../declarations'
import Apartments from './apartments'
import Docs from './docs'
import Floorplans from './floorplans'
import Scheduling from './scheduling'

/**
 * @file Services
 * @module lib/services
 */

/**
 * Array of services to configure.
 */
export const services = [Apartments, Docs, Floorplans, Scheduling]

/**
 * Configures the library services.
 *
 * @param app - Feathers application
 */
export default (app: Application): void => {
  services.forEach(service => app.configure(service))
}

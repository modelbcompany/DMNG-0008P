import { Application } from '../../declarations'
import { registerService } from '../../utils'
import Apartments from './Apartments'

/**
 * @file Service - Apartments
 * @module services/apartments
 */

// Add to service type index
declare module '../../declarations' {
  interface ServiceTypes {
    apartments: Apartments
  }
}

export default (app: Application): void => {
  return registerService(app, 'apartments', () => new Apartments())
}

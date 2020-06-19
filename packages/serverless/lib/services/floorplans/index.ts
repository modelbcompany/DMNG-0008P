import { Application } from '../../declarations'
import { registerService } from '../../utils'
import Floorplans from './Floorplans'

/**
 * @file Service - Floorplans
 * @module services/floorplans
 */

// Add to service type index
declare module '../../declarations' {
  interface ServiceTypes {
    floorplans: Floorplans
  }
}

export default (app: Application): void => {
  return registerService(app, 'floorplans', () => new Floorplans())
}

import { Application } from '../../declarations'
import { registerService } from '../../utils'
import Scheduling from './Scheduling'

/**
 * @file Service - Scheduling
 * @module services/scheduling
 */

// Add to service type index
declare module '../../declarations' {
  interface ServiceTypes {
    scheduling: Scheduling
  }
}

export default (app: Application): void => {
  return registerService(app, 'scheduling', () => new Scheduling())
}

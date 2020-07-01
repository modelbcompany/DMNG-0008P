import { Application } from '../../declarations'
import { registerService } from '../../utils'
import Leads from './Leads'

/**
 * @file Service - Leads
 * @module services/leads
 */

// Add to service type index
declare module '../../declarations' {
  interface ServiceTypes {
    leads: Leads
  }
}

export default (app: Application): void => {
  return registerService(app, 'leads', () => new Leads())
}

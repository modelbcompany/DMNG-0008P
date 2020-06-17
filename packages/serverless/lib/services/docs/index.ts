import { Application } from '../../declarations'
import { registerService } from '../../utils'
import Docs from './Docs'

/**
 * @file Service - Docs
 * @module services/docs
 */

// Add to service type index
declare module '../../declarations' {
  interface ServiceTypes {
    docs: Docs
  }
}

export default (app: Application): void => {
  return registerService(app, 'docs', () => new Docs())
}

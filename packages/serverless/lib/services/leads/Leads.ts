import axios from 'axios'
import {
  Application,
  AxiosStatic,
  Lead,
  Params,
  ServiceWithMixins
} from '../../declarations'
import logger from '../../logger'

/**
 * @file Service - Leads
 * @module services/scheduling/Leads
 */

export default class Leads implements ServiceWithMixins<Lead> {
  /**
   * Feathers application instance.
   */
  private app?: Application

  /**
   * Path service was registered on without the '/'.
   */
  private path?: string

  /**
   * Axios instance.
   */
  private requestRentCafeWebAPI: AxiosStatic = axios

  /**
   * Special service initialization method.
   *
   * For services registered before `app.listen` is invoked, the setup function
   * of each registered service is called on invoking `app.listen`.
   *
   * For services registered after `app.listen` is invoked, setup is called
   * automatically by Feathers when a service is registered.
   *
   * @param app - Feathers application
   * @param path - Path service was registered on without the '/'
   */
  setup(app: Application, path: string): void {
    this.app = app
    this.path = path
    this.requestRentCafeWebAPI = this.app.get('axios')

    logger.debug({
      level: 'debug',
      service: { initialized: 'scheduling', path: this.path }
    })
  }

  /**
   * Inserts guest card information from third-party providers.
   *
   * @async
   * @param data - Request data
   * @param data.email - Email address of prospect
   * @param data.firstName - First name of prospect
   * @param data.lastName - Last name of prospect
   * @param data.phone - Phone number of prospect
   * @param data.source - Marketing source to credit on the prospect’s record
   * @param param1 - Additional information for the service method
   * @param param1.url - RENTCafé URL to request
   * @returns Appt and lead data
   */
  async create<Lead>(data: Lead, { url }: Params): Promise<Lead> {
    let response = {}

    try {
      response = await this.requestRentCafeWebAPI({ method: 'post', url, data })
    } catch (err) {
      logger.error({ level: 'error', 'Leads.create': err })
      throw err
    }

    return response as Lead
  }
}

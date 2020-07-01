import axios from 'axios'
import {
  Application,
  AxiosStatic,
  Floorplan,
  Params,
  ServiceWithMixins
} from '../../declarations'
import logger from '../../logger'

/**
 * @file Service - Floorplans
 * @module services/floorplans/Floorplans
 */

export default class Floorplans implements ServiceWithMixins<Floorplan> {
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
      service: { initialized: 'floorplans', path: this.path }
    })
  }

  /**
   * Returns floor plan data.
   *
   * @todo Document query parameters
   *
   * @async
   * @param param0 - Additional information for the service method
   * @param param0.query - Query parameters
   * @param param0.url - RENTCafé URL to request
   * @returns RENTCafé floor plan data
   */
  async find({ query, url }: Params): Promise<Floorplan[]> {
    let floorplans: Floorplan[] = []

    try {
      floorplans = (this.requestRentCafeWebAPI(url, {
        params: query
      }) as unknown) as Floorplan[]
    } catch (err) {
      logger.error({ level: 'error', 'Floorplans.find': err })
      throw err
    }

    return floorplans
  }
}

import axios from 'axios'
import qs from 'querystring'
import {
  Apartment,
  ApartmentWithPlan,
  Application,
  AxiosStatic,
  Params,
  ServiceTypes,
  ServiceWithMixins
} from '../../declarations'
import logger from '../../logger'

/**
 * @file Service - Apartments
 * @module services/apartments/Apartments
 */

export default class Apartments implements ServiceWithMixins<Apartment> {
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

    logger.debug({ service: { initialized: 'apartments', path: this.path } })
  }

  /**
   * Returns apartment and floorplan data merged together.
   *
   * Data can be filtered by unit code, available move-in date, floor plan id,
   * number of bedrooms and bathrooms, as well as rent range.
   *
   * @async
   * @param param0 - Additional information for the service method
   * @param param0.query - Query parameters
   * @param param0.query.availableDate - Availability date
   * @param param0.query.numberOfBaths - Number of bathrooms
   * @param param0.query.numberOfBeds - Number of bedrooms
   * @param param0.query.rentRange - Monthly rent amount range
   * @param param0.url - RENTCafé URL to request
   * @returns RENTCafé apartment data
   */
  async find({ query, url }: Params): Promise<ApartmentWithPlan[]> {
    let apartments: ApartmentWithPlan[] = []

    if (query?.availableDate) {
      query.availableDate = qs.unescape(query.availableDate)
    }

    try {
      apartments = ((await this.requestRentCafeWebAPI(url, {
        params: query
      })) as unknown) as ApartmentWithPlan[]

      const floorplansService = (this.app as Application).service(
        'floorplans'
      ) as ServiceTypes['floorplans']

      const floorplans = await floorplansService.find({})

      apartments = apartments.map(apt => ({
        ...(floorplans.find(
          floorplan => floorplan.FloorplanId === apt.FloorplanId
        ) || {}),
        ...apt
      }))
    } catch (err) {
      logger.error({ 'Apartments.find': err })
      throw err
    }

    return apartments
  }
}

import axios from 'axios'
import { omit, pick } from 'lodash'
import {
  AnyObject,
  Application,
  AppointmentWithLead,
  AvailableAppointment,
  AvailableSlot,
  AxiosStatic,
  CancelledAppointment,
  NewAppointment,
  NullableId,
  Params,
  ServiceWithMixins
} from '../../declarations'
import logger from '../../logger'

/**
 * @file Service - Scheduling
 * @module services/scheduling/Scheduling
 */

/* eslint-disable prettier/prettier */

/**
 * Types of data assocated with the `Scheduling` service.
 */
export type SchedulingData = (
  AppointmentWithLead
  & AvailableAppointment
  & AvailableSlot
  & CancelledAppointment
)

/* eslint-enable prettier/prettier */

export default class Scheduling implements ServiceWithMixins<SchedulingData> {
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

    logger.debug({ service: { initialized: 'scheduling', path: this.path } })
  }

  /**
   * Creates an appointment on the leasing staff’s CRM calendar.
   * Either adds a guest card or matches and updates an existing card.
   *
   * @async
   * @param data - Request data
   * @param data.apptDate - Appointment date
   * @param data.apptTime - Appointment time
   * @param data.email - Lead email
   * @param data.phone - Lead phone number
   * @param data.source - Primary marketing source
   * @param param1 - Additional information for the service method
   * @param param1.url - RENTCafé URL to request
   * @returns Appt and lead data
   */
  async create(data: any, { url }: Params): Promise<any> {
    let response = {} as AnyObject

    data = data as NewAppointment

    try {
      response = await this.requestRentCafeWebAPI({ method: 'post', url, data })
    } catch (err) {
      logger.error({ 'Scheduling.create': err })
      throw err
    }

    return response as AppointmentWithLead
  }

  /**
   * Returns dates and times available for meeting prospects.
   *
   * @async
   * @param param0 - Additional information for the service method
   * @param param0.url - RENTCafé URL to request
   * @returns Available appointments
   */
  async find({ url }: Params): Promise<AvailableAppointment[]> {
    let response = {} as AnyObject

    try {
      response = await this.requestRentCafeWebAPI({ method: 'post', url })
    } catch (err) {
      logger.error({ 'Scheduling.find': err })
      throw err
    }

    return response.AvailableSlots.map(
      (slot: AvailableSlot, index: number, availableSlots: AvailableSlot[]) => {
        const parseSlot = (slotData: AnyObject) =>
          omit(
            {
              ...slotData,
              dtEnd: Object.assign({}, slotData).dtEnd.split(' '),
              dtStart: Object.assign({}, slotData).dtStart.split(' ')
            },
            ['TypeofSlot']
          )

        const parsed = availableSlots.map((avs: AnyObject) => parseSlot(avs))

        const slotCopy: AnyObject = parseSlot(slot)

        slotCopy.date = slotCopy.dtStart[0]
        slotCopy.property = slotCopy.PropertyId
        slotCopy.times = []

        parsed.forEach((s: AnyObject) => {
          if (s.dtStart[0] === slotCopy.date) {
            let time = `${s.dtStart[1]}${s.dtStart[2]}`
            time = time.replace(':00AM', 'AM').replace(':00PM', 'PM')

            slotCopy.times.push(time)
          }
        })

        return pick(slotCopy, ['property', 'date', 'times'])
      }
    )
  }

  /**
   * Cancels a scheduled appointment.
   *
   * @async
   * @param id
   * @param param1 - Additional information for the service method
   * @param param1.data - Request data
   * @param param1.data.apptDate - Appointment date
   * @param param1.data.apptTime - Appointment time
   * @param param1.data.voyApptId - Voyager Appt ID
   * @param param1.data.voyProspectId - Voyager prospect ID
   * @param param1.query - Query parameters
   * @param param1.query.companyCode - Company token from RENTCafé
   * @param param1.query.marketingAPIKey - Yardi API Key
   * @param param1.query.propertyId - RENTCafé property identifier
   * @param param1.query.requestType - Marketing API endpoint to request (w/o
   * trailing slashes)
   * @param param2.url - RENTCafé URL to request
   * @returns Cancelled appointment
   */
  async remove(id: NullableId, { data, url }: Params): Promise<any> {
    let response = {}

    try {
      response = await this.requestRentCafeWebAPI({ method: 'post', url, data })
    } catch (err) {
      logger.error({ 'Scheduling.remove': err })
      throw err
    }

    return response as CancelledAppointment
  }
}

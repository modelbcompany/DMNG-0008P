import { Application as ExpressFeathers } from '@feathersjs/express'
import { Service } from '@feathersjs/feathers'
import '@feathersjs/transport-commons'

/**
 * Type capturing any pure object.
 */
export type AnyObject = Record<string, any>

/**
 * RENTCafé apartment schema.
 */
export type Apartment = {
  Amenities: string
  ApartmentId: string
  ApartmentName: string
  ApplyOnlineURL: string
  AvailableDate: string
  Baths: string
  Beds: string
  Deposit: string
  FloorplanId: string
  FloorplanName: string
  MaximumRent: string
  MinimumRent: string
  Specials: string
  SQFT: string
  PropertyId: string
  PropertyShowsSpecials: string
  UnitImageURLs: string
  UnitTypeMapping: string
  VoyagerPropertyCode: string
  VoyagerPropertyId: string
}

export type ApartmentWithPlan = Apartment & {
  Amenities: string
  ApartmentId: string
  ApartmentName: string
  ApplyOnlineURL: string
  AvailabilityURL: string
  AvailableDate: string
  AvailableUnitsCount: string
  Baths: string
  Beds: string
  Deposit: string
  FloorplanHasSpecials: string
  FloorplanId: string
  FloorplanImageAltText: ''
  FloorplanImageName: string
  FloorplanImageURL: string
  FloorplanName: string
  MaximumDeposit: string
  MaximumRent: string
  MaximumSQFT: string
  MinimumDeposit: string
  MinimumRent: string
  MinimumSQFT: string
  PropertyId: string
  PropertyShowsSpecials: string
  SQFT: string
  Specials: string
  UnitImageAltText: string
  UnitImageURLs: string[]
  UnitStatus: string
  UnitTypeMapping: string
  VoyagerPropertyCode: string
  VoyagerPropertyId: string
}

/**
 * Feathers application type. Will be throughout the codebase.
 */
export type Application = ExpressFeathers<ServiceTypes>

/**
 * RENTCafé created appointment schema.
 */
export type AppointmentWithLead = {
  RentcafeProspectId: number
  VoyProspectApptId: number
  VoyProspectCode: string
  VoyProspectId: string
}

/**
 * RENTCafé appointment schema.
 */
export type AvailableSlot = {
  dtEnd: string
  dtStart: string
  PropertyId: number
}

/**
 * RENTCafé appointment schema.
 */
export type AvailableAppointment = {
  date: string
  times: string[]
  property: number
}

/**
 * RENTCafé appointment schema.
 */
export type CancelledAppointment = {
  ErrorCode: 0
  ErrorMessage: 'Appointment is canceled.'
  ErrorTrace: null
  Response: null
}

/**
 * {@link Docs} service data type.
 */
export type Documentation = {
  repo: string
  version: string
}

/**
 * RENTCafé floorplan schema.
 */
export type Floorplan = {
  AvailabilityURL: string
  AvailableUnitsCount: string
  Baths: string
  Beds: string
  FloorplanHasSpecials: string
  FloorplanImageAltText: string
  FloorplanImageName: string
  FloorplanImageURL: string
  FloorplanId: string
  FloorplanName: string
  MaximumDeposit: string
  MinimumDeposit: string
  MaximumRent: string
  MinimumRent: string
  MaximumSqFt: string
  MinimumSqFt: string
  PropertyShowsSpecials: string
  UnitTypeMapping: string
}

export type IncomingRequest = {
  body: AnyObject | null
  cookies: AnyObject
  id: string | null
  query: AnyObject
  method: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT' | 'OPTIONS'
  path: string
  service: string
}

export interface Lead {
  email: string
  firstName: string
  lastName: string
  phone: string
  source: string
}

export interface NewAppointment extends Lead {
  apptDate: string
  apptTime: string
}

/**
 * Feathers `Service` with mixin definition.
 */
export type ServiceWithMixins<T = Record<string, any>> = Partial<
  Service<T & any> & {
    [key: string]: (...arguments: any) => any
  }
>

/**
 * Feathers `Service` with mixin definition.
 */
export type RentCafeAuthentication = {
  apiToken: string
  companyCode: string
  marketingAPIKey: string
  propertyId: string
  requestType: string
}

/**
 * A mapping of service names to types. Will be extended in service files.
 */
export interface ServiceTypes {
  // TO BE EXTENDED
}

// Feathers declarations
export { FeathersError, FeathersErrorJSON } from '@feathersjs/errors'
export {
  Hook,
  HookContext,
  HooksObject,
  Id,
  NullableId,
  Paginated,
  PaginationOptions,
  Params,
  Query,
  Service,
  ServiceAddons,
  ServiceMethods
} from '@feathersjs/feathers'
export { AxiosResponse, AxiosStatic } from 'axios'


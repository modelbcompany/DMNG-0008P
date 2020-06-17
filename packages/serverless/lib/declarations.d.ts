import { Application as ExpressFeathers } from '@feathersjs/express'
import { Service } from '@feathersjs/feathers'
import '@feathersjs/transport-commons'

export type AnyObject = Record<string, any>

export type APIResponse<T = any> = {
  status: number
  data: T
}

/**
 * Feathers application type. Will be throughout the codebase.
 */
export type Application = ExpressFeathers<ServiceTypes>

/**
 * {@link Docs} service data type.
 */
export type Documentation = {
  repo: string
  version: string
}

export type IncomingRequest = {
  body: AnyObject | null
  cookies: AnyObject
  query: AnyObject
  method: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT' | 'OPTIONS'
  path: string
  service: string
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


import {
  Application,
  Documentation,
  ServiceWithMixins
} from '../../declarations'
import logger from '../../logger'

/**
 * @file Service - Docs
 * @module services/docs/Docs
 */

export default class Docs implements ServiceWithMixins<Documentation> {
  /**
   * Feathers application instance.
   */
  private app?: Application

  /**
   * Path service was registered on without the '/'.
   */
  private path?: string

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

    logger.debug({
      level: 'debug',
      service: { initialized: 'docs', path: this.path }
    })
  }

  /**
   * Returns the current API documentation.
   *
   * @async
   * @returns API documentation
   */
  async find(): Promise<Documentation> {
    const service = (this.app as Application).service(
      this.path as string
    ) as ServiceWithMixins

    return {
      repo: 'https://github.com/modelbcompany/DMNG-0008P',
      version: service.apiVersion()
    }
  }
}

import { HookContext } from '../declarations'

/**
 * @file Removes the API prefix from the incoming path
 * @module hooks/removeAPIPrefix
 * @see {@link https://docs.feathersjs.com/api/hooks.html#hook-context}
 */

/**
 * Removes the API version prefix from {@param context.path}.
 *
 * @param context - Information about the service method call
 * @param context.app - Feathers application
 * @param context.path - Service name (or path) without slashes
 * @returns Updated hook context
 */
export const removeAPIPrefix = (context: HookContext): HookContext => {
  const { path } = context

  return {
    ...context,
    path: path.replace(`/${context.app.get('version')}`, '')
  }
}

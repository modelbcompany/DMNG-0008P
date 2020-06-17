/* eslint-disable @typescript-eslint/no-var-requires */

// ! Set Feathers application config directory
// ! https://docs.feathersjs.com/api/configuration.html

process.env['NODE_CONFIG_DIR'] = require('path').join(__dirname, '../config/')

/* eslint-enable @typescript-eslint/no-var-requires */

import { NowRequest, NowResponse } from '@vercel/node'
import { omit } from 'lodash'
import { app, logger, pickRequestProperties } from '../lib'
import { ServiceTypes } from '../lib/declarations'

/**
 * @file API Route + Controller
 * @module api
 * @todo Update documentation
 */

export default async (
  req: NowRequest,
  res: NowResponse
): Promise<NowResponse> => {
  const incoming = pickRequestProperties(req)

  logger.info({ incoming })

  const { body: data, query, method, path } = incoming
  const { id = null } = query

  const params = { query: omit(query, ['id']) }
  const service = app.service(path) as ServiceTypes

  let serviceMethod: string | null = null
  let args: any[] = []

  switch (method) {
    case 'DELETE':
      serviceMethod = 'remove'
      break
    case 'PATCH':
      serviceMethod = 'patch'
      break
    case 'POST':
      serviceMethod = 'create'
      break
    case 'PUT':
      serviceMethod = 'update'
      break
    default:
      serviceMethod = query.id ? 'get' : 'find'
  }

  if (method === 'GET' && !query.id) {
    args = [params]
  } else if (['DELETE', 'GET'].includes(method) && query.id) {
    args = [id, params]
  } else if (['PATCH', 'PUT'].includes(method)) {
    args = [id, data, params]
  } else if (method === 'POST') {
    args = [data, params]
  }

  // TODO Retrieve status from service response
  // TODO Retrieve error status from error

  try {
    const apiRes = await service[serviceMethod](...args)

    return res.status(200).json(apiRes)
  } catch (error) {
    logger.error(error)
    return res.status(500).json(error)
  }
}

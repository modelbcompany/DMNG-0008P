/* eslint-disable @typescript-eslint/no-var-requires */

// ! Set Feathers application config directory
// ! https://docs.feathersjs.com/api/configuration.html

process.env['NODE_CONFIG_DIR'] = require('path').join(__dirname, '../config/')

/* eslint-enable @typescript-eslint/no-var-requires */

import { NowRequest, NowResponse } from '@vercel/node'
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

  if (incoming.method === 'OPTIONS') {
    return (res.status(200).end() as unknown) as NowResponse
  }

  const { body: data, id, query, method, service: servicePath } = incoming

  const params = { query }
  const service = app.service(servicePath) as ServiceTypes

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
      serviceMethod = incoming.id ? 'get' : 'find'
  }

  if (method === 'GET' && !incoming.id) {
    args = [params]
  } else if (['DELETE', 'GET'].includes(method) && incoming.id) {
    args = [id, params]
  } else if (['PATCH', 'PUT'].includes(method)) {
    args = [id, data, params]
  } else if (method === 'POST') {
    args = [data, params]
  }

  try {
    const apiRes = await service[serviceMethod](...args)

    return res.status(200).json(apiRes)
  } catch (error) {
    return res.status(error.code || 500).json(error)
  }
}

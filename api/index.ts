import { NowRequest, NowResponse } from '@vercel/node'

/**
 * @file API Entry Point
 * @module api
 */

export default (req: NowRequest, res: NowResponse): Record<string, any> => {
  return res.json({ hello: 'World' })
}


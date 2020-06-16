import { NowRequest, NowResponse } from '@vercel/node'
import { pick } from 'lodash'

/**
 * @file API Entry Point
 * @module api
 */

export default (req: NowRequest, res: NowResponse): Record<string, any> => {
  return res.status(200).json({ req: pick(req, 'body', 'query') })
}

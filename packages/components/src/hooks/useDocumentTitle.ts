import { useEffect } from 'react'
import { isString } from '../utils'

/**
 * @file Update the page title
 * @module hooks/useDocumentTitle
 */

/**
 * Set the page title.
 *
 * @param {string} title - New page title
 * @returns {string} @param title
 */
export const useDocumentTitle = (title = '') => {
  if (!isString(title)) title = ''

  useEffect(() => {
    document.title = title
  }, [title])

  return title
}

export default useDocumentTitle

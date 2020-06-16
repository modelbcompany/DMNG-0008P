// React
import { useEffect } from 'react'
import { isObject } from '../utils'
import useBoolean from './useBoolean'
import useObject from './useObject'

/**
 * @file Use the Disclosure Design Pattern
 * @module hooks/useDisclosure
 * @see {@link https://www.w3.org/TR/wai-aria-practices-1.1/#disclosure}
 * @todo Update hook description
 */

/**
 * NOTICE - Disabling react-hooks/exhaustive-deps
 *
 * If `config`, `config.trigger`, or `config.content` are used in the
 * `useEffect` dependency array, the following error will be thrown:
 *
 * `Warning: Maximum update depth exceeded. This can happen when a component
 * calls setState inside useEffect, but useEffect either doesn't have a
 * dependency array, or one of the dependencies changes on every render.`
 *
 * The `config` object will be recreated on every render, and therefore will
 * never be equal to the previous reference.
 *
 * Furthermore, `setTrigger`, `setContent`, and `toggle` do not need to be
 * tracked.
 */

/* eslint-disable react-hooks/exhaustive-deps */

/**
 * @param {object} config - Disclosure config
 * @param {object} config.trigger - Properties to pass to the element that shows
 * and hides the disclosure content
 * @param {object} config.content - Properties to pass disclosure content
 * @returns {object}
 */
export const useDisclosure = config => {
  config = {
    trigger: isObject(config.trigger) || {},
    content: isObject(config.content) || {}
  }

  const { trigger: propsTrigger = {}, content: propsContent = {} } = config

  const { boolean: expanded, setBoolean: setDisclosure, toggle } = useBoolean(
    false
  )

  const { object: trigger, setObject: setTrigger } = useObject(propsTrigger)

  const { object: content, setObject: setContent } = useObject(propsContent)

  useEffect(() => {
    // ! If defined, sync open state with incoming props
    if (content.open !== undefined) setDisclosure(content.open)

    setTrigger(trigger => ({
      ...trigger,
      'aria-controls': content.id || true,
      'aria-expanded': expanded,
      'aria-haspopup': trigger['aria-haspopup'] || true,
      onClick: function (event) {
        toggle()

        if (config?.trigger?.onClick) config.trigger.onClick(event)
      }
    }))

    setContent(content => ({
      ...content,
      'data-controlled': true,
      'data-expanded': expanded
    }))
  }, [
    config.trigger.onClick,
    content.id,
    content.open,
    expanded,
    trigger['aria-haspopup']
  ])

  return { content, expanded, setDisclosure, toggle, trigger }
}

export default useDisclosure

/* eslint-enable react-hooks/exhaustive-deps */

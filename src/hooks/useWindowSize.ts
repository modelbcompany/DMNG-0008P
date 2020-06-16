import { useCallback, useEffect } from 'react'
import useObject from './useObject'

/**
 * @file Use window size
 * @module hooks/useWindowSize
 */

/**
 * Returns an object containing the current window height and width.
 *
 * @returns {object}
 */
export const useWindowSize = () => {
  const { object: size, setObject: setSize } = useObject({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const handleResize = useCallback(
    () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      }),
    [window.innerHeight, window.innerWidth]
  )

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [window.innerHeight, window.innerWidth])

  return size
}

export default useWindowSize

import { Navigation, NavigationProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - Navigation
 * @module Stories/Components/Molecules/Navigation
 */

export default {
  component: Navigation,
  title: 'Components/Molecules/Navigation'
}

/**
 * Default {@link Navigation} story.
 */
export const Default = (): ReactElement<NavigationProps> => <Navigation />

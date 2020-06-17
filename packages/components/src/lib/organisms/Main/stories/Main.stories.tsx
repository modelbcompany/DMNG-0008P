import React, { ReactElement } from 'react'
import { Main, MainProps } from '../Main'

/**
 * @file Stories - Main
 * @module Stories/Components/Organisms/Main
 */

export default {
  component: Main,
  title: 'Components/Organisms/Main'
}

/**
 * Default {@link Main} story.
 */
export const Default = (): ReactElement<MainProps> => <Main />

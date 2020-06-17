import { Main, MainProps } from 'lib'
import React, { ReactElement } from 'react'

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

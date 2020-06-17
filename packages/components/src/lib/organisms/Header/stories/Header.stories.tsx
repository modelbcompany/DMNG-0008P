import { Header, HeaderProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - Header
 * @module Stories/Components/Organisms/Header
 */

export default {
  component: Header,
  title: 'Components/Organisms/Header'
}

/**
 * Default {@link Header} story.
 */
export const Default = (): ReactElement<HeaderProps> => <Header />

import { Aside, AsideProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - Aside
 * @module Stories/Components/Organisms/Aside
 */

export default {
  component: Aside,
  title: 'Components/Organisms/Aside'
}

/**
 * Default {@link Aside} story.
 */
export const Default = (): ReactElement<AsideProps> => <Aside />

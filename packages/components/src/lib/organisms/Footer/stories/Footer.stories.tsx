import { Footer, FooterProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - Footer
 * @module Stories/Components/Organisms/Footer
 */

export default {
  component: Footer,
  title: 'Components/Organisms/Footer'
}

/**
 * Default {@link Footer} story.
 */
export const Default = (): ReactElement<FooterProps> => <Footer />

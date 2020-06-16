import { Section, SectionProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - Section
 * @module Stories/Components/Organisms/Section
 */

export default {
  component: Section,
  title: 'Components/Organisms/Section'
}

/**
 * Default {@link Section} story.
 */
export const Default = (): ReactElement<SectionProps> => <Section />

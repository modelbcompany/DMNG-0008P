import { Summary, SummaryProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - Summary
 * @module Stories/Components/Atoms/Summary
 */

export default {
  component: Summary,
  title: 'Components/Atoms/Summary'
}

/**
 * Default {@link Summary} story.
 */
export const Default = (args: SummaryProps): ReactElement<SummaryProps> => (
  <Summary {...args} />
)

import { Code, CodeProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - Code
 * @module Stories/Components/Atoms/Code
 */

export default {
  component: Code,
  title: 'Components/Atoms/Code'
}

/**
 * Default {@link Code} story.
 */
export const Default = (args: CodeProps): ReactElement<CodeProps> => (
  <Code {...args} />
)

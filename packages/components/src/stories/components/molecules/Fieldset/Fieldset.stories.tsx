import { Fieldset, FieldsetProps } from 'lib'
import React, { ReactElement } from 'react'

/**
 * @file Stories - Fieldset
 * @module Stories/Components/Molecules/Fieldset
 */

export default {
  component: Fieldset,
  title: 'Components/Molecules/Fieldset'
}

/**
 * Default {@link Fieldset} story.
 */
export const Default = (): ReactElement<FieldsetProps> => <Fieldset />

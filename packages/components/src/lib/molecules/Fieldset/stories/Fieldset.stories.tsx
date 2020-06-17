import React, { ReactElement } from 'react'
import { Fieldset, FieldsetProps } from '../Fieldset'

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

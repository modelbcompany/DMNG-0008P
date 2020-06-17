import React, { ReactElement } from 'react'
import { Icon, IconProps } from '../Span'

/**
 * @file Stories - Icon
 * @module Stories/Components/Atoms/Span/Icon
 */

export default {
  component: Icon,
  title: 'Components/Atoms/Span/Components/Icon'
}

/**
 * Default {@link Icon} story.
 * Renders standard Material Icons.
 *
 * @see {@link https://material-ui.com/components/icons/#icon-font-icons}
 */
export const Default = (args: IconProps): ReactElement<IconProps> => (
  <Icon {...args}>add_circle_outline</Icon>
)

/**
 * {@link Icon} story.for Font Awesome icons.
 *
 * @see {@link https://material-ui.com/components/icons/#font-awesome}
 */
export const FontAwesome = (args: IconProps): ReactElement<IconProps> => (
  <Icon {...args} className={`fa fab fa-twitter`} />
)

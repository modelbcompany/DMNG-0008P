import React, { ReactElement } from 'react'
import { Link, LinkProps } from '../Link'

/**
 * @file Stories - Link
 * @module Stories/Components/Atoms/Link
 */

export default {
  component: Link,
  title: 'Components/Atoms/Link'
}

/**
 * Default {@link Link} story.
 */
export const Default = (args: LinkProps): ReactElement<LinkProps> => (
  <Link {...args} />
)

/**
 * Renders an {@link Icon} component on either side of the link text.
 */
export const IconLink = (args: LinkProps): ReactElement<LinkProps> => (
  <Link
    {...args}
    icon={{
      children: 'keyboard_arrow_right',
      'data-position': 'right'
    }}
  />
)

IconLink.storyName = 'With Icon'

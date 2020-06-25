import { Link, LinkProps } from 'lib'
import React, { ReactElement } from 'react'
import { getColorItem } from 'storybook/config'

/**
 * @file Stories - Link
 * @module Stories/Components/Atoms/Link
 */

export default {
  component: Link,
  title: 'Components/Atoms/Link'
}

/**
 * Button-like {@link Link} story.
 */
export const ButtonLike = (args: LinkProps): ReactElement<LinkProps> => (
  <Link {...args} />
)

ButtonLike.storyName = 'Apply Now'
ButtonLike.args = {
  children: 'Apply Now',
  className: 'mb-link--button-like is-centered-text is-uppercase'
}
ButtonLike.parameters = {
  backgrounds: {
    default: 'Silver Rust',
    values: [getColorItem('brand.$color-brand-silver-rust', false)]
  }
}

/**
 * Button-like {@link Link} story.
 */
export const ButtonLikeDark = (args: LinkProps): ReactElement<LinkProps> => (
  <Link {...args} />
)

ButtonLikeDark.storyName = 'Download Floorplan'
ButtonLikeDark.args = {
  children: 'Download Floorplan',
  className: 'mb-link--button-like--dark is-centered-text is-uppercase'
}
ButtonLikeDark.parameters = {
  backgrounds: {
    default: 'Silver Rust',
    values: [getColorItem('brand.$color-brand-silver-rust', false)]
  }
}

/**
 * Button-like {@link Link} story.
 */
export const ButtonLikeAccented = (
  args: LinkProps
): ReactElement<LinkProps> => <Link {...args} />

ButtonLikeAccented.storyName = 'View Floorplans'
ButtonLikeAccented.args = {
  children: 'View Floorplans',
  className: 'mb-link--button-like--accented is-centered-text is-uppercase'
}
ButtonLikeAccented.parameters = {
  backgrounds: {
    default: 'Silver Rust',
    values: [getColorItem('brand.$color-brand-silver-rust', false)]
  }
}

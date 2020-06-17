import React, { ReactElement } from 'react'
import { getColorItem } from 'storybook/config'
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
 * {@link Floorplan} "Apply Now" {@link Link} story.
 */
export const ApplyNowLink = (
  args: LinkProps
): ReactElement<LinkProps> => <Link {...args} />

ApplyNowLink.storyName = 'Apply Now'
ApplyNowLink.args = {
  children: 'Apply Now',
  className: 'floorplan-link'
}
ApplyNowLink.parameters = {
  backgrounds: {
    default: 'Silver Rust',
    values: [getColorItem('brand.$color-brand-silver-rust', false)]
  }
}

/**
 * Download {@link Floorplan} {@link Link} story.
 */
export const DownloadFloorplanLink = (
  args: LinkProps
): ReactElement<LinkProps> => <Link {...args} />

DownloadFloorplanLink.storyName = 'Download'
DownloadFloorplanLink.args = {
  children: 'Download Floorplan',
  className: 'floorplan-link',
  download: true
}
DownloadFloorplanLink.parameters = {
  backgrounds: {
    default: 'Silver Rust',
    values: [getColorItem('brand.$color-brand-silver-rust', false)]
  }
}

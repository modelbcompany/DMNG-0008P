import React, { ReactElement } from 'react'
import { Container, ContainerProps } from '../Container'

/**
 * @file Stories - Container
 * @module Stories/Components/Molecules/Container
 */

export default {
  component: Container,
  title: 'Components/Molecules/Container',
  parameters: {
    actions: {
      disabled: true
    },
    controls: {
      disabled: true
    }
  }
}

/**
 * Default {@link Container} story.
 */
export const Default = (): ReactElement<ContainerProps> => <Container />

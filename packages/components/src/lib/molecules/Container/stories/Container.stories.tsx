import React, { ReactElement } from 'react'
import { Container, ContainerProps } from '../Container'

/**
 * @file Stories - Container
 * @module Stories/Components/Molecules/Container
 */

export default {
  component: Container,
  title: 'Components/Molecules/Container'
}

/**
 * Default {@link Container} story.
 */
export const Default = (): ReactElement<ContainerProps> => <Container />

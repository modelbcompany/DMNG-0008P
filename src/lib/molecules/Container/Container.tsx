import { Props, PropsWithContainer } from 'definitions'
import { useMutatedProps } from 'hooks'
import _ from 'lodash'
import React, { FC, HTMLAttributes } from 'react'
import './sass/Container.scss'
/**
 * @module Components/Molecules/Container
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/div}
 */

/**
 * React `<article>` properties.
 */
export type ReactDivProps = HTMLAttributes<HTMLDivElement>

/**
 * {@link Container} component properties.
 */
export interface ContainerProps extends Props {
  //
}

/**
 * {@link Column} component properties.
 */
export interface ColumnProps extends PropsWithContainer {
  //
}

/**
 * {@link Row} component properties.
 */
export interface RowProps extends PropsWithContainer {
  //
}

/**
 * Renders a `<div>` element with the class `adm-container`.
 *
 * **https://developer.mozilla.org/docs/Web/HTML/Element/div**
 */
export const Container: FC<ContainerProps> = (props: ContainerProps) => (
  <div {...(useMutatedProps(props, 'adm-container') as ReactDivProps)} />
)

/**
 * Renders an `<div>` element with the class `column`.
 */
export const Column: FC<ColumnProps> = ({
  container,
  ...rest
}: ColumnProps) => {
  const mutatedProps = useMutatedProps(rest, 'column')

  if (!container) return <div {...(mutatedProps as ReactDivProps)} />

  return (
    <div {..._.omit(mutatedProps, 'children')}>
      <Container className='column-container'>
        {_.pick(mutatedProps, 'children')}
      </Container>
    </div>
  )
}

/**
 * Renders an `<div>` element with the class `row`.
 */
export const Row: FC<RowProps> = ({ container, ...rest }: RowProps) => {
  const mutatedProps = useMutatedProps(rest, 'row')

  if (!container) return <div {...(mutatedProps as ReactDivProps)} />

  return (
    <div {..._.omit(mutatedProps, 'children')}>
      <Container className='row-container'>
        {_.pick(mutatedProps, 'children')}
      </Container>
    </div>
  )
}

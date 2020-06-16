import { Container } from 'lib'
import { PropsWithContainer } from 'definitions'
import { useMutatedProps } from 'hooks'
import _ from 'lodash'
import React, { FC, HTMLAttributes } from 'react'
import './sass/Article.scss'

/**
 * @module Components/Molecules/Article
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/article}
 */

/**
 * React `<article>` properties.
 */
export type ReactArticleProps = HTMLAttributes<HTMLElement>

/**
 * {@link Article} component properties.
 */
export interface ArticleProps extends PropsWithContainer {
  //
}

/**
 * Renders an `<article>` element with the class `adm-article`.
 *
 * **https://developer.mozilla.org/docs/Web/HTML/Element/article**
 */
export const Article: FC<ArticleProps> = ({
  container,
  ...rest
}: ArticleProps) => {
  const mutatedProps = useMutatedProps(rest, 'adm-article')

  if (!container) return <article {...(mutatedProps as ReactArticleProps)} />

  return (
    <article {..._.omit(mutatedProps, 'children')}>
      <Container className='article-container'>
        {_.pick(mutatedProps, 'children')}
      </Container>
    </article>
  )
}

Article.defaultProps = {
  container: false
}

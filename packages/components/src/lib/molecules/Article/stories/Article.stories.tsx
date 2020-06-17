import React, { ReactElement } from 'react'
import { Article, ArticleProps } from '../Article'

/**
 * @file Stories - Article
 * @module Stories/Components/Molecules/Article
 */

export default {
  component: Article,
  title: 'Components/Molecules/Article'
}

/**
 * Default {@link Article} story.
 */
export const Default = (): ReactElement<ArticleProps> => <Article />

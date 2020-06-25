import { ApartmentWithPlan, PropsWithContainer } from 'declarations'
import { useMutatedProps, useObject } from 'hooks'
import { Container, Heading, Image, Link, Paragraph, Span } from 'lib'
import _ from 'lodash'
import React, { FC, HTMLAttributes } from 'react'

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
export type ArticleProps = PropsWithContainer

/**
 * {@link Floorplan} component properties.
 */
export interface FloorplanProps extends ArticleProps {
  /**
   * Apartment data merged with Floorplan data.
   */
  aptWithPlan?: ApartmentWithPlan
}

/**
 * Renders an `<article>` element with the class `mb-adm-article`.
 *
 * **https://developer.mozilla.org/docs/Web/HTML/Element/article**
 */
export const Article: FC<ArticleProps> = ({
  container,
  ...rest
}: ArticleProps) => {
  const mutatedProps = useMutatedProps(rest, 'mb-adm-article')

  if (!container) return <article {...(mutatedProps as ReactArticleProps)} />

  return (
    <article {..._.omit(mutatedProps, 'children')}>
      <Container className='article-container'>
        {_.pick(mutatedProps, 'children')}
      </Container>
    </article>
  )
}

/**
 * Renders an @link Article component with the class `floorplan`.
 *
 * @param props - Component data
 */
export const Floorplan: FC<FloorplanProps> = ({ aptWithPlan, ...rest }) => {
  const mutatedProps = useMutatedProps(rest, 'floorplan')

  aptWithPlan = aptWithPlan as ApartmentWithPlan

  const { empty, object: floorplan } = useObject({
    ...aptWithPlan,
    ApartmentName: aptWithPlan.ApartmentName.substring(
      2,
      aptWithPlan.ApartmentName.length
    ),
    Baths: JSON.parse(aptWithPlan.Baths || ''),
    Beds: JSON.parse(aptWithPlan.Beds || ''),
    MinimumRent: ((value?: string) => {
      if (!value) return ''

      if (value.length < 4) return `$${value}`

      return `$${value.slice(0, 1)},${value.slice(1, value.length)}`
    })(aptWithPlan.MinimumRent)
  })

  if (empty) return <Article {...mutatedProps} />

  const {
    ApartmentName,
    ApplyOnlineURL,
    AvailabilityURL,
    Baths,
    Beds,
    FloorplanId,
    FloorplanImageAltText,
    FloorplanImageName,
    FloorplanImageURL,
    FloorplanName,
    MinimumRent,
    SQFT
  } = floorplan

  return (
    <Article {...mutatedProps} title={`Floorplan ${FloorplanId}`}>
      <Container className='column floorplan-column'>
        <Container className='column image-column'>
          <Image
            alt={FloorplanImageAltText}
            className='floorplan-img'
            src={FloorplanImageURL}
            title={FloorplanImageName}
          />
        </Container>

        <Container className='column text-column'>
          <Heading className='floorplan-heading' size={3}>
            {`#${ApartmentName || FloorplanId}`}
          </Heading>
          <Paragraph className='floorplan-details'>
            <Span className='floorplan-name'>{FloorplanName}&nbsp;</Span>
            <Span className='floorplan-beds'>
              {`| ${Beds} Bedroom${Beds === 1 ? '' : 's'}`}&nbsp;
            </Span>
            <Span className='floorplan-baths'>
              {`| ${Baths} Bathroom${Baths === 1 ? '' : 's'}`}
            </Span>
          </Paragraph>
          <Paragraph className='floorplan-sqft'>{`${SQFT} SQ. FT.`}</Paragraph>
          <Paragraph className='floorplan-rent'>{MinimumRent}</Paragraph>
        </Container>

        <Container className='column link-column'>
          <Link
            className='floorplan-link'
            href={ApplyOnlineURL || AvailabilityURL}
            target='_blank'
            title={
              ApplyOnlineURL
                ? `Apply for ${ApartmentName}`
                : `Check floorplan availability for ${FloorplanId}`
            }
          >
            Apply Now
          </Link>

          <Link
            className='floorplan-link'
            href={FloorplanImageURL}
            download
            target='_blank'
            title={FloorplanImageName}
          >
            Download Floorplan
          </Link>
        </Container>
      </Container>
    </Article>
  )
}

Article.defaultProps = {
  container: false
}

Floorplan.defaultProps = {
  aptWithPlan: {} as ApartmentWithPlan
}

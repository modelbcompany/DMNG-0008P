import { FeathersErrorJSON } from '@feathersjs/errors'
import api from 'api'
import { ApartmentWithPlan } from 'declarations'
import { useMutatedProps } from 'hooks'
import {
  Container,
  FloorplansGrid,
  FloorplansSearchForm,
  FloorplansSearchFormState as FloorplanSearch,
  Main,
  MainProps
} from 'lib'
import logger from 'logger'
import React, { FC, useEffect, useState } from 'react'

/**
 * @module Components/Templates/FloorplansTemplate
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/main}
 */

/**
 * {@link FloorplansTemplate} component properties.
 */
export type FloorplansTemplateProps = MainProps

/**
 * API responses from the `Apartments` service.
 */
export type ApartmentsAPIResponse = ApartmentWithPlan[] | FeathersErrorJSON

/**
 * `Apartments` service query.
 */
export type ApartmentsQuery = FloorplanSearch | Partial<FloorplanSearch>

/**
 * Renders a `Main` component with the class `adt-floorplans`.
 *
 * @param props - Component data
 */
export const FloorplansTemplate: FC<FloorplansTemplateProps> = (
  props: FloorplansTemplateProps
) => {
  const [apartments, setApartments] = useState<ApartmentWithPlan[]>([])
  const [apiError, setAPIError] = useState()
  const [gridTitle, setGridTitle] = useState('Floorplans')
  const [query, setQuery] = useState<ApartmentsQuery>({})

  useEffect(() => {
    /* eslint-disable prettier/prettier */

    (async () => {
      let aptsWithPlans = [] as ApartmentsAPIResponse

      try {
        aptsWithPlans = await api.service('apartments').find({ query })

        if ((aptsWithPlans as FeathersErrorJSON).code) throw aptsWithPlans
      } catch (err) {
        logger.error({ FloorplansTemplate: err })


        if (err?.data?.code !== '1050') {
          setApartments([])
        } else {
          setApartments([...apartments])
        }

        setAPIError(err)
        throw err
      }

      setApartments([...(aptsWithPlans as ApartmentWithPlan[])])
    })()

    /* eslint-disable prettier/prettier */
  }, [
    query.availableDate,
    query.numberOfBaths,
    query.numberOfBeds,
    query.rentRange
  ])

  useEffect(() => {
    const { numberOfBeds } = query

    if (numberOfBeds) {
      setGridTitle(
        numberOfBeds === 0
          ? 'Studios'
          : `${numberOfBeds} Bedroom${numberOfBeds === 1 ? '' : 's'}`
      )
    } else {
      setGridTitle('Floorplans')
    }
  }, [
    query.availableDate,
    query.numberOfBaths,
    query.numberOfBeds,
    query.rentRange
  ])

  return (
    <Main {...useMutatedProps(props, 'adt-floorplans')}>
      <Container>
        <FloorplansSearchForm search={formState => setQuery(formState)} />
      </Container>

      <FloorplansGrid
        apiError={apiError}
        gridData={apartments}
        gridTitle={gridTitle}
      />
    </Main>
  )
}

FloorplansTemplate.defaultProps = {}

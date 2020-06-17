import { Props } from 'declarations'
import { useMutatedProps } from 'hooks'
import React, { FC } from 'react'
import ReactCalendar, { CalendarProps as RCProps } from 'react-calendar'
import './sass/Calendar.scss'

/**
 * @module Components/Organisms/Calendar
 * @see {@link https://github.com/wojtekmaj/react-calendar}
 */

/**
 * {@link Calendar} component properties.
 */
export interface CalendarProps extends Props<RCProps> {
  //
}

/**
 * Renders a <div> element with the class `ado-calendar`.
 */
export const Calendar: FC<CalendarProps> = props => {
  const mutatedProps = useMutatedProps(props, 'ado-calendar') as CalendarProps

  mutatedProps.calendarType = 'US'

  return <ReactCalendar {...mutatedProps} />
}

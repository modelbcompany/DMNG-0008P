import React, { ReactElement } from 'react'
import { Calendar, CalendarProps } from '../Calendar'

/**
 * @file Stories - Calendar
 * @module Stories/Components/Organisms/Calendar
 */

export default {
  component: Calendar,
  title: 'Components/Organisms/Calendar'
}

/**
 * Default {@link Calendar} story.
 */
export const Default = (): ReactElement<CalendarProps> => <Calendar />

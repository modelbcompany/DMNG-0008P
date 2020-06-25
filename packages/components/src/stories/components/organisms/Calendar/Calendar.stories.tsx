import { Calendar, CalendarProps } from 'lib'
import React, { ReactElement } from 'react'

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

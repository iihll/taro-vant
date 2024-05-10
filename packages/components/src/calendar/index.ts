import _Calendar from './Calendar'

export const Calendar = _Calendar
export default Calendar
export { calendarProps } from './Calendar'
export type { CalendarProps } from './Calendar'
export type {
  CalendarType,
  CalendarDayItem,
  CalendarDayType,
  CalendarInstance,
  CalendarThemeVars,
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanCalendar: typeof Calendar
  }
}

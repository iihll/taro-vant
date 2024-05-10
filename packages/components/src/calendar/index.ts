import _Calendar from './Calendar'

export const VanCalendar = _Calendar
export default VanCalendar
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
    VanCalendar: typeof VanCalendar
  }
}

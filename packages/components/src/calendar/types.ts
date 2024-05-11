import type { ComponentPublicInstance, ComputedRef, Ref } from 'vue'
import type { Numeric } from '../utils'
import type { CalendarProps } from './Calendar'
import type { CalendarMonthProps } from './CalendarMonth'

export type CalendarSwitchMode = 'none' | 'month' | 'year-month'

export type CalendarType = 'single' | 'range' | 'multiple'

export type CalendarDayType =
  | ''
  | 'start'
  | 'start-end'
  | 'middle'
  | 'end'
  | 'selected'
  | 'multiple-middle'
  | 'multiple-selected'
  | 'disabled'
  | 'placeholder'

export interface CalendarDayItem {
  date?: Date
  text?: Numeric
  type?: CalendarDayType
  topInfo?: string
  className?: unknown
  bottomInfo?: string
}

export interface CalendarExpose {
  reset: (date?: Date | Date[]) => void
  scrollToDate: (targetDate: Date) => void
  getSelectedDate: () => Date | Date[] | null
}

export type CalendarInstance = ComponentPublicInstance<
  CalendarProps,
  CalendarExpose
>

export type CalendarMonthInstance = ComponentPublicInstance<
  CalendarMonthProps,
  {
    showed?: boolean
    getTitle: () => string
    getHeight: () => number
    setVisible: (value?: boolean | undefined) => void
    scrollToDate: (body: Element, targetDate: Date) => number
    disabledDays: Ref<ComputedRef<CalendarDayItem[]>>
  }
>

export interface CalendarThemeVars {
  calendarBackground?: string
  calendarPopupHeight?: string
  calendarHeaderShadow?: string
  calendarHeaderTitleHeight?: string
  calendarHeaderTitleFontSize?: string
  calendarHeaderSubtitleFontSize?: string
  calendarHeaderActionWidth?: string
  calendarHeaderActionColor?: string
  calendarHeaderActionDisabledColor?: string
  calendarWeekdaysHeight?: string
  calendarWeekdaysFontSize?: string
  calendarMonthTitleFontSize?: string
  calendarMonthMarkColor?: string
  calendarMonthMarkFontSize?: string
  calendarDayHeight?: string
  calendarDayFontSize?: string
  calendarDayMarginBottom?: string
  calendarRangeEdgeColor?: string
  calendarRangeEdgeBackground?: string
  calendarRangeMiddleColor?: string
  calendarRangeMiddleBackgroundOpacity?: number | string
  calendarSelectedDaySize?: string
  calendarSelectedDayColor?: string
  calendarInfoFontSize?: string
  calendarInfoLineHeight?: number | string
  calendarSelectedDayBackground?: string
  calendarDayDisabledColor?: string
  calendarConfirmButtonHeight?: string
  calendarConfirmButtonMargin?: string
}

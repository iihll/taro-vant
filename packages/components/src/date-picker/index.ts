import type { DatePickerProps } from './DatePicker'
import _DatePicker from './DatePicker'

export const VanDatePicker = _DatePicker
export default VanDatePicker
export { datePickerProps } from './DatePicker'
export type { DatePickerProps }
export type { DatePickerColumnType, DatePickerInstance } from './DatePicker'

declare module 'vue' {
  export interface GlobalComponents {
    VanDatePicker: typeof VanDatePicker
  }
}

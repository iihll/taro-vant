import type { PickerProps } from './Picker'
import _Picker from './Picker'

export const VanPicker = _Picker
export default VanPicker
export { pickerProps } from './Picker'
export type { PickerProps }
export type {
  PickerColumn,
  PickerOption,
  PickerInstance,
  PickerThemeVars,
  PickerFieldNames,
  PickerToolbarPosition,
  PickerCancelEventParams,
  PickerChangeEventParams,
  PickerConfirmEventParams,
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanPicker: typeof VanPicker
  }
}

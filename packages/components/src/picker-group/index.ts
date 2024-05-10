import _PickerGroup, { PickerGroupProps } from './PickerGroup'

export const VanPickerGroup = _PickerGroup
export default VanPickerGroup
export { pickerGroupProps } from './PickerGroup'
export type { PickerGroupProps }
export type { PickerGroupThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanPickerGroup: typeof VanPickerGroup
  }
}

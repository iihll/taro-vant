import type { ComponentPublicInstance } from 'vue'
import type { Numeric } from '../utils'
import type { PickerProps } from './Picker'

export type PickerToolbarPosition = 'top' | 'bottom'

export interface PickerFieldNames {
  text?: string
  value?: string
  children?: string
}

export interface PickerOption {
  text?: Numeric
  value?: Numeric
  disabled?: boolean
  children?: PickerColumn
  className?: unknown
  // for custom field names
  [key: PropertyKey]: any
}

export type PickerColumn = PickerOption[]

export interface PickerExpose {
  confirm: () => void
  getSelectedOptions: () => Array<PickerOption | undefined>
}

export interface PickerColumnProvide {
  state: {
    index: number
    offset: number
    duration: number
    options: PickerOption[]
  }
  setIndex: (index: number, emitChange?: boolean | undefined) => void
  getValue: () => PickerOption
  setValue: (value: string) => void
  setOptions: (options: PickerOption[]) => void
  stopMomentum: () => void
}

export type PickerInstance = ComponentPublicInstance<PickerProps, PickerExpose>

export interface PickerConfirmEventParams {
  selectedValues: Numeric[]
  selectedOptions: Array<PickerOption | undefined>
  selectedIndexes: number[]
}

export type PickerCancelEventParams = PickerConfirmEventParams

export type PickerChangeEventParams = PickerConfirmEventParams & {
  columnIndex: number
}

export interface PickerThemeVars {
  pickerBackground?: string
  pickerToolbarHeight?: string
  pickerTitleFontSize?: string
  pickerTitleLineHeight?: number | string
  pickerActionPadding?: string
  pickerActionFontSize?: string
  pickerConfirmActionColor?: string
  pickerCancelActionColor?: string
  pickerOptionFontSize?: string
  pickerOptionPadding?: string
  pickerOptionTextColor?: string
  pickerOptionDisabledOpacity?: number | string
  pickerLoadingIconColor?: string
  pickerLoadingMaskColor?: string
  pickerMaskColor?: string
}

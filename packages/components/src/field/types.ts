import type { ComponentPublicInstance, ComputedRef } from 'vue'
import type { InputProps } from '@tarojs/components'
import type { FieldProps } from './Field'

export type FieldType = keyof InputProps.Type | 'textarea' | 'search'

export type FieldTextAlign = 'left' | 'center' | 'right' | 'top'

export type FieldClearTrigger = 'always' | 'focus'

export type FieldFormatTrigger = 'onBlur' | 'onChange'

export type FieldValidateTrigger = 'onBlur' | 'onChange' | 'onSubmit'

export interface FieldAutosizeConfig {
  maxHeight?: number
  minHeight?: number
}

export interface FieldValidateError {
  name?: string
  message: string
}

export type FieldRuleMessage =
  | string
  | ((value: any, rule: FieldRule) => string)

export type FieldRuleValidator = (
  value: any,
  rule: FieldRule,
) => boolean | string | Promise<boolean | string>

export type FieldRuleFormatter = (value: any, rule: FieldRule) => string

export interface FieldRule {
  pattern?: RegExp
  trigger?: FieldValidateTrigger | FieldValidateTrigger[]
  message?: FieldRuleMessage
  required?: boolean
  validator?: FieldRuleValidator
  formatter?: FieldRuleFormatter
  validateEmpty?: boolean
}

export type FieldValidationStatus = 'passed' | 'failed' | 'unvalidated'

// Shared props of Field and Form
export type FieldFormSharedProps =
  | 'colon'
  | 'required'
  | 'disabled'
  | 'readonly'
  | 'labelWidth'
  | 'labelAlign'
  | 'inputAlign'
  | 'errorMessageAlign'

export interface FieldExpose {
  blur: () => void | undefined
  focus: () => void | undefined
  validate: (
    rules?: FieldRule[] | undefined,
  ) => Promise<void | FieldValidateError>
  resetValidation: () => void
  getValidationStatus: () => FieldValidationStatus
  /** @private */
  formValue: ComputedRef<unknown>
}

export type FieldInstance = ComponentPublicInstance<FieldProps, FieldExpose>

declare global {
  interface EventTarget {
    composing?: boolean
  }
}

export interface FieldThemeVars {
  fieldLabelWidth?: string
  fieldLabelColor?: string
  fieldLabelMarginRight?: string
  fieldInputTextColor?: string
  fieldInputErrorTextColor?: string
  fieldInputDisabledTextColor?: string
  fieldPlaceholderTextColor?: string
  fieldIconSize?: string
  fieldClearIconSize?: string
  fieldClearIconColor?: string
  fieldRightIconColor?: string
  fieldErrorMessageColor?: string
  fieldErrorMessageFontSize?: string
  fieldTextAreaMinHeight?: string
  fieldWordLimitColor?: string
  fieldWordLimitFontSize?: string
  fieldWordLimitLineHeight?: number | string
  fieldDisabledTextColor?: string
  fieldRequiredMarkColor?: string
}

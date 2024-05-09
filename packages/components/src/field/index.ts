import type { FieldProps } from './Field'
import _Field from './Field'

export const VanField = _Field
export default VanField
export { fieldProps } from './Field'
export type { FieldProps }
export type {
  FieldType,
  FieldRule,
  FieldInstance,
  FieldTextAlign,
  FieldThemeVars,
  FieldRuleMessage,
  FieldClearTrigger,
  FieldFormatTrigger,
  FieldRuleValidator,
  FieldRuleFormatter,
  FieldValidateError,
  FieldAutosizeConfig,
  FieldValidateTrigger,
  FieldValidationStatus,
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanField: typeof VanField
  }
}

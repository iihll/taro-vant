import { withInstall } from '../utils'
import _Checkbox from './Checkbox'

export const VanCheckbox = withInstall(_Checkbox)
export default VanCheckbox
export { checkboxProps } from './Checkbox'
export type { CheckboxProps } from './Checkbox'
export type {
  CheckboxShape,
  CheckboxInstance,
  CheckboxThemeVars,
  CheckboxLabelPosition,
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanCheckbox: typeof VanCheckbox
  }
}

import _CheckboxGroup from './CheckboxGroup'

export const VanCheckboxGroup = _CheckboxGroup
export default VanCheckboxGroup
export { checkboxGroupProps } from './CheckboxGroup'
export type { CheckboxGroupProps } from './CheckboxGroup'
export type {
  CheckboxGroupInstance,
  CheckboxGroupDirection,
  CheckboxGroupToggleAllOptions,
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanCheckboxGroup: typeof VanCheckboxGroup
  }
}

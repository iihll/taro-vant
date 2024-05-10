import _RadioGroup from './RadioGroup'

export const VanRadioGroup = _RadioGroup
export default VanRadioGroup
export { radioGroupProps } from './RadioGroup'
export type { RadioGroupProps, RadioGroupDirection } from './RadioGroup'

declare module 'vue' {
  export interface GlobalComponents {
    VanRadioGroup: typeof VanRadioGroup
  }
}

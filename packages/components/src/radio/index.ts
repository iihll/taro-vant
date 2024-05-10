import _Radio from './Radio'

export const VanRadio = _Radio
export default VanRadio
export { radioProps } from './Radio'
export type { RadioProps, RadioShape, RadioLabelPosition } from './Radio'
export type { RadioThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanRadio: typeof VanRadio
  }
}

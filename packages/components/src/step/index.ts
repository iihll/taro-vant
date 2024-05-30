import _Step from './Step'

export const VanStep = _Step
export default VanStep
export type { StepThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanStep: typeof VanStep
  }
}

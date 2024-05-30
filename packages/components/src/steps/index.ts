import _Steps from './Steps'

export const VanSteps = _Steps
export default VanSteps
export { stepsProps } from './types'
export type { StepsProps, StepsDirection, StepsThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanSteps: typeof VanSteps
  }
}

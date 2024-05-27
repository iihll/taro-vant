import _Progress from './Progress'

export const VanProgress = _Progress
export default VanProgress
export type { ProgressInstance, ProgressThemeVars, progressProps } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanProgress: typeof VanProgress
  }
}

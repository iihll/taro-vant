import _Loading from './Loading'

export const VanLoading = _Loading
export default VanLoading
export { loadingProps } from './types'
export type { LoadingThemeVars, LoadingType, LoadingProps } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanLoading: typeof VanLoading
  }
}
import _Empty from './Empty'

export const VanEmpty = _Empty
export default VanEmpty
export type { EmptyProps, EmptyThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanEmpty: typeof VanEmpty
  }
}
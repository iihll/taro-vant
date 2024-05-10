import _Divider from './Divider'

export const VanDivider = _Divider
export default VanDivider
export { dividerProps } from './types'
export type { DividerThemeVars, DividerProps, DividerContentPosition } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanDivider: typeof VanDivider
  }
}
import _Sticky from './Sticky'

export const VanSticky = _Sticky
export default VanSticky
export { stickyProps } from './Sticky'
export type { StickyProps, StickyPosition } from './Sticky'
export type { StickyThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanSticky: typeof VanSticky
  }
}

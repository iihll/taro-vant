import type { SwipeProps } from './Swipe'
import _Swipe from './Swipe'

export const VanSwipe = _Swipe
export default VanSwipe
export { swipeProps } from './Swipe'
export type { SwipeProps }
export type { SwipeInstance, SwipeToOptions, SwipeThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanSwipe: typeof VanSwipe
  }
}

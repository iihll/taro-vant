import type { SwipeProps } from './Swipe'
import _Swipe from './Swipe'

export const Swipe = _Swipe
export default Swipe
export { swipeProps } from './Swipe'
export type { SwipeProps }
export type { SwipeInstance, SwipeToOptions, SwipeThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanSwipe: typeof Swipe
  }
}

import _SwipeItem from './SwipeItem'

export const SwipeItem = _SwipeItem
export default SwipeItem

declare module 'vue' {
  export interface GlobalComponents {
    VanSwipeItem: typeof SwipeItem
  }
}

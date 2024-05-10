import _SwipeItem from './SwipeItem'

export const VanSwipeItem = _SwipeItem
export default VanSwipeItem

declare module 'vue' {
  export interface GlobalComponents {
    VanSwipeItem: typeof VanSwipeItem
  }
}

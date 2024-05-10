import type { SwipeCellProps } from './SwipeCell'
import _SwipeCell from './SwipeCell'

export const VanSwipeCell = _SwipeCell
export default VanSwipeCell
export { swipeCellProps } from './SwipeCell'
export type { SwipeCellProps }
export type {
  SwipeCellSide,
  SwipeCellPosition,
  SwipeCellInstance,
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanSwipeCell: typeof VanSwipeCell
  }
}

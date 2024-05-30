import _Skeleton from './Skeleton'

export const VanSkeleton = _Skeleton

export default VanSkeleton

export { skeletonProps } from './types'
export type { SkeletonThemeVars, SkeletonProps } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanSkeleton: typeof VanSkeleton
  }
}

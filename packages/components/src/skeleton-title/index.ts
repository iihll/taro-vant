import _SkeletonTitle from './SkeletonTitle'

export const VanSkeletonTitle = _SkeletonTitle
export default VanSkeletonTitle

export { skeletonTitleProps } from './types'
export type { SkeletonTitleProps } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanSkeletonTitle: typeof VanSkeletonTitle
  }
}

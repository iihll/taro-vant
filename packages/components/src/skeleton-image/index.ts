import _SkeletonImage from './SkeletonImage'

export const VanSkeletonImage = _SkeletonImage
export default VanSkeletonImage

export { skeletonImageProps } from './types'
export type { SkeletonImageProps, SkeletonImageShape } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanSkeletonImage: typeof VanSkeletonImage
  }
}

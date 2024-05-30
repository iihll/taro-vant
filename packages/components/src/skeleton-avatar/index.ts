import _SkeletonAvatar from './SkeletonAvatar'

export const VanSkeletonAvatar = _SkeletonAvatar
export default VanSkeletonAvatar

export { skeletonAvatarProps } from './types'
export type {
  SkeletonAvatarProps,
  SkeletonAvatarShape,
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanSkeletonAvatar: typeof VanSkeletonAvatar
  }
}

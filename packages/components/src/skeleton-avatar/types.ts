import type { ExtractPropTypes } from 'vue'
import { makeStringProp, numericProp } from '../utils'

export type SkeletonAvatarShape = 'square' | 'round'

export const skeletonAvatarProps = {
  avatarSize: numericProp,
  avatarShape: makeStringProp<SkeletonAvatarShape>('round'),
}

export type SkeletonAvatarProps = ExtractPropTypes<typeof skeletonAvatarProps>

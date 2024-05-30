import type { ExtractPropTypes } from 'vue'
import { makeStringProp, numericProp } from '../utils'

export type SkeletonImageShape = 'square' | 'round'

export const skeletonImageProps = {
  imageSize: numericProp,
  imageShape: makeStringProp<SkeletonImageShape>('square'),
}

export type SkeletonImageProps = ExtractPropTypes<typeof skeletonImageProps>

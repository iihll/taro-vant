import type { ExtractPropTypes } from 'vue'
import { numericProp } from '../utils'

export const skeletonTitleProps = {
  round: Boolean,
  titleWidth: numericProp,
}

export type SkeletonTitleProps = ExtractPropTypes<typeof skeletonTitleProps>

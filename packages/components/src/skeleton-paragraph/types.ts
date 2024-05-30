import type { ExtractPropTypes } from 'vue'
import { numericProp } from '../utils'

export const DEFAULT_ROW_WIDTH = '100%'

export const skeletonParagraphProps = {
  round: Boolean,
  rowWidth: {
    type: numericProp,
    default: DEFAULT_ROW_WIDTH,
  },
}

export type SkeletonParagraphProps = ExtractPropTypes<typeof skeletonParagraphProps>

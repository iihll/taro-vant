import type { ExtractPropTypes, PropType } from 'vue'
import type { Numeric } from '../utils'
import { makeNumericProp, makeStringProp, numericProp, truthProp } from '../utils'
import type { SkeletonAvatarShape } from '../skeleton-avatar'
import { DEFAULT_ROW_WIDTH } from '../skeleton-paragraph'

export interface SkeletonThemeVars {
  skeletonParagraphHeight?: string
  skeletonParagraphBackground?: string
  skeletonParagraphMarginTop?: string
  skeletonTitleWidth?: string
  skeletonAvatarSize?: string
  skeletonAvatarBackground?: string
  SkeletonImageSize?: string
  SkeletonImageRadius?: string
  skeletonDuration?: string
}

export const skeletonProps = {
  row: makeNumericProp(0),
  round: Boolean,
  title: Boolean,
  titleWidth: numericProp,
  avatar: Boolean,
  avatarSize: numericProp,
  avatarShape: makeStringProp<SkeletonAvatarShape>('round'),
  loading: truthProp,
  animate: truthProp,
  rowWidth: {
    type: [Number, String, Array] as PropType<Numeric | Numeric[]>,
    default: DEFAULT_ROW_WIDTH,
  },
}

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>

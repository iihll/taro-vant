import _SkeletonParagraph from './SkeletonParagraph'

export const VanSkeletonParagraph = _SkeletonParagraph
export default VanSkeletonParagraph

export { skeletonParagraphProps, DEFAULT_ROW_WIDTH } from './types'
export type { SkeletonParagraphProps } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanSkeletonParagraph: typeof VanSkeletonParagraph
  }
}

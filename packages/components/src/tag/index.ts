import _Tag from './Tag'

export const VanTag = _Tag
export default VanTag
export { tagProps } from './Tag'
export type { TagProps } from './Tag'
export type { TagSize, TagType, TagThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanTag: typeof VanTag
  }
}

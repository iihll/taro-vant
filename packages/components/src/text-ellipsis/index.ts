import _TextEllipsis from './TextEllipsis'

export const VanTextEllipsis = _TextEllipsis
export default VanTextEllipsis
export { textEllipsisProps } from './types'
export type { TextEllipsisInstance, TextEllipsisThemeVars, TextEllipsisProps } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanTextEllipsis: typeof VanTextEllipsis
  }
}

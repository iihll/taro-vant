import _Highlight from './Highlight'

export const VanHighlight = _Highlight
export default VanHighlight

export { highlightProps } from './types'
export type { HighlightThemeVars, HighlightProps } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanHighlight: typeof VanHighlight
  }
}
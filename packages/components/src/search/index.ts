import type { SearchProps } from './Search'
import _Search from './Search'

export const VanSearch = _Search
export default VanSearch
export { searchProps } from './Search'
export type { SearchProps }
export type { SearchShape, SearchInstance, SearchThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanSearch: typeof VanSearch
  }
}

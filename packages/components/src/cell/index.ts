import _Cell from './Cell'

export const VanCell = _Cell
export default VanCell
export { cellProps } from './Cell'
export type { CellSize, CellProps, CellArrowDirection } from './Cell'
export type { CellThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanCell: typeof VanCell
  }
}

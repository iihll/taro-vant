import _CellGroup from './CellGroup'

export const VanCellGroup = _CellGroup
export default VanCellGroup
export { cellGroupProps } from './CellGroup'
export type { CellGroupProps } from './CellGroup'
export type { CellGroupThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanCellGroup: typeof VanCellGroup
  }
}

import _Row from './Row'

export const VanRow = _Row
export default VanRow
export { rowProps } from './Row'
export type { RowProps, RowAlign, RowJustify } from './Row'

declare module 'vue' {
  export interface GlobalComponents {
    VanRow: typeof VanRow
  }
}

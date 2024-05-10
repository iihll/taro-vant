import _Collapse from './Collapse'

export const VanCollapse = _Collapse
export default VanCollapse
export { collapseProps } from './types'
export type {
  CollapseProps,
  CollapseInstance,
  CollapseToggleAllOptions,
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanCollapse: typeof VanCollapse
  }
}
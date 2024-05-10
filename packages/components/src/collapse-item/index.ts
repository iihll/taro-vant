import _CollapseItem from './CollapseItem'

export const VanCollapseItem = _CollapseItem
export default VanCollapseItem
export { collapseItemProps } from './types'
export type { CollapseItemProps, CollapseItemInstance, CollapseItemThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanCollapseItem: typeof VanCollapseItem
  }
}

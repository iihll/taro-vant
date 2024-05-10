import type { TabsProps } from './Tabs'
import _Tabs from './Tabs'

export const VanTabs = _Tabs
export default VanTabs
export { tabsProps } from './Tabs'
export type { TabsProps }
export type { TabsType, TabsInstance, TabsThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanTabs: typeof VanTabs
  }
}

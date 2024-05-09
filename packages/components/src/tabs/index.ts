import type { TabsProps } from './Tabs'
import _Tabs from './Tabs'

export const Tabs = _Tabs
export default Tabs
export { tabsProps } from './Tabs'
export type { TabsProps }
export type { TabsType, TabsInstance, TabsThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanTabs: typeof Tabs
  }
}

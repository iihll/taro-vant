import _Tab from './Tab'

export const VanTab = _Tab
export default VanTab
export { tabProps } from './Tab'
export type { TabProps } from './Tab'

declare module 'vue' {
  export interface GlobalComponents {
    VanTab: typeof VanTab
  }
}

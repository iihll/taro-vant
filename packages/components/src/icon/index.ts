import _Icon from './Icon'

export const VanIcon = _Icon
export default VanIcon
export { iconProps } from './Icon'
export type { IconProps } from './Icon'

declare module 'vue' {
  export interface GlobalComponents {
    VanIcon: typeof VanIcon
  }
}

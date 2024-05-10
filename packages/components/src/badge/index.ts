import _Badge from './Badge'

export const VanBadge = _Badge
export default VanBadge
export { badgeProps } from './Badge'
export type { BadgeProps, BadgePosition } from './Badge'
export type { BadgeThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanBadge: typeof Badge
  }
}

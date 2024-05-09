import _Badge from './Badge'

export const Badge = _Badge
export default Badge
export { badgeProps } from './Badge'
export type { BadgeProps, BadgePosition } from './Badge'
export type { BadgeThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanBadge: typeof Badge
  }
}

import _RollingText from './RollingText'

export const VanRollingText = _RollingText
export default VanRollingText
export { rollingTextProps } from './types'
export type {
  RollingTextDirection,
  RollingTextInstance,
  RollingTextStopOrder,
  RollingTextThemeVars,
  RollingTextProps,
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanRollingText: typeof VanRollingText
  }
}

import _CountDown from './CountDown'

export const VanCountDown = _CountDown
export default VanCountDown
export { countDownProps } from './types'
export type {
  CountDownProps,
  CountDownInstance,
  CountDownThemeVars,
  CountDownCurrentTime,
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanCountDown: typeof VanCountDown
  }
}
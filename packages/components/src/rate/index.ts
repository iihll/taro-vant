import _Rate from './Rate'

export const VanRate = _Rate
export default VanRate
export { rateProps } from './types'
export type { RateThemeVars, RateProps } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanRate: typeof VanRate
  }
}
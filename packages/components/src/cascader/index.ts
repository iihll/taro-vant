import _Cascader from './Cascader'

export const VanCascader = _Cascader
export default VanCascader
export { cascaderProps } from './Cascader'
export type { CascaderProps } from './Cascader'
export type {
  CascaderOption,
  CascaderThemeVars,
  CascaderFieldNames,
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanCascader: typeof VanCascader
  }
}

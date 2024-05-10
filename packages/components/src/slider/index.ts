import _Slider from './Slider'

export const VanSlider = _Slider
export default VanSlider
export { sliderProps } from './Slider'
export type { SliderProps } from './Slider'
export type { SliderThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanSlider: typeof VanSlider
  }
}

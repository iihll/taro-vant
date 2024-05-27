import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { makeArrayProp, makeNumberProp, makeStringProp, truthProp } from '../utils'

export type RollingTextDirection = 'up' | 'down'
export type RollingTextStopOrder = 'ltr' | 'rtl'

export interface RollingTextExpose {
  start: () => void
  reset: () => void
}

export type RollingTextInstance = ComponentPublicInstance<
  RollingTextProps,
  RollingTextExpose
>

export interface RollingTextThemeVars {
  rollingTextBackground?: string
  rollingTextColor?: string
  rollingTextFontSize?: string
  rollingTextGap?: string
  rollingTextItemWidth?: string
  rollingTextItemBorderRadius?: string
}

// rollingTextProps
export const rollingTextProps = {
  startNum: makeNumberProp(0),
  targetNum: Number,
  textList: makeArrayProp<string>(),
  duration: makeNumberProp(2),
  autoStart: truthProp,
  direction: makeStringProp<RollingTextDirection>('down'),
  stopOrder: makeStringProp<RollingTextStopOrder>('ltr'),
  height: makeNumberProp(40),
}

export type RollingTextProps = ExtractPropTypes<typeof rollingTextProps>

// rollingTextItemProps
export const rollingTextItemProps = {
  figureArr: makeArrayProp(),
  delay: Number,
  duration: makeNumberProp(2),
  isStart: Boolean,
  direction: makeStringProp<RollingTextDirection>('down'),
  height: makeNumberProp(40),
}

import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import type { Numeric } from '../utils'
import { numericProp, truthProp } from '../utils'

export type ProgressInstance = ComponentPublicInstance<ProgressProps>

export interface ProgressThemeVars {
  progressHeight?: string
  progressColor?: string
  progressInactiveColor?: string
  progressBackground?: string
  progressPivotPadding?: string
  progressPivotTextColor?: string
  progressPivotFontSize?: string
  progressPivotLineHeight?: number | string
  progressPivotBackground?: string
}

export const progressProps = {
  color: String,
  inactive: Boolean,
  pivotText: String,
  textColor: String,
  showPivot: truthProp,
  pivotColor: String,
  trackColor: String,
  strokeWidth: numericProp,
  percentage: {
    type: numericProp,
    default: 0,
    validator: (value: Numeric) => +value >= 0 && +value <= 100,
  },
}

export type ProgressProps = ExtractPropTypes<typeof progressProps>

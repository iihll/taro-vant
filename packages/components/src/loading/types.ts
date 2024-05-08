import { ExtractPropTypes } from 'vue'
import { makeStringProp, numericProp } from '../utils'

export type LoadingThemeVars = {
  loadingTextColor?: string
  loadingTextFontSize?: string
  loadingSpinnerColor?: string
  loadingSpinnerSize?: string
  loadingSpinnerDuration?: string
}

export type LoadingType = 'circular' | 'spinner'

export const loadingProps = {
  size: numericProp,
  type: makeStringProp<LoadingType>('circular'),
  color: makeStringProp('#c9c9c9'),
  vertical: Boolean,
  textSize: numericProp,
  textColor: String,
}

export type LoadingProps = ExtractPropTypes<typeof loadingProps>
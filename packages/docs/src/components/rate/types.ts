import { ExtractPropTypes } from 'vue'
import { makeNumberProp, makeNumericProp, makeStringProp, numericProp, truthProp } from '../utils'

export type RateThemeVars = {
  rateIconSize?: string
  rateIconGutter?: string
  rateIconVoidColor?: string
  rateIconFullColor?: string
  rateIconDisabledColor?: string
}

export const rateProps = {
  size: numericProp,
  icon: makeStringProp('star'),
  color: String,
  count: makeNumericProp(5),
  gutter: numericProp,
  clearable: Boolean,
  readonly: Boolean,
  disabled: Boolean,
  voidIcon: makeStringProp('star-o'),
  allowHalf: Boolean,
  voidColor: String,
  touchable: truthProp,
  iconPrefix: String,
  modelValue: makeNumberProp(0),
  disabledColor: String,
}

export type RateProps = ExtractPropTypes<typeof rateProps>

type RateStatus = 'full' | 'half' | 'void'

export type RateListItem = {
  value: number
  status: RateStatus
}
import type { ExtractPropTypes } from 'vue'
import { makeNumericProp, makeStringProp } from '../utils'

export interface StepsThemeVars {
  stepsBackground?: string
}

export type StepsDirection = 'horizontal' | 'vertical'

export const stepsProps = {
  active: makeNumericProp(0),
  direction: makeStringProp<StepsDirection>('horizontal'),
  activeIcon: makeStringProp('checked'),
  iconPrefix: String,
  finishIcon: String,
  activeColor: String,
  inactiveIcon: String,
  inactiveColor: String,
}

export type StepsProps = ExtractPropTypes<typeof stepsProps>

export interface StepsProvide {
  props: StepsProps
  onClickStep: (index: number) => void
}

import { ExtractPropTypes } from 'vue'
import { makeStringProp, truthProp } from '../utils'

export type DividerThemeVars = {
  dividerMargin?: string
  dividerTextColor?: string
  dividerFontSize?: string
  dividerLineHeight?: number | string
  dividerBorderColor?: string
  dividerContentPadding?: string
  dividerContentLeftWidth?: string
  dividerContentRightWidth?: string
}

export type DividerContentPosition = 'left' | 'center' | 'right'

export const dividerProps = {
  dashed: Boolean,
  hairline: truthProp,
  vertical: Boolean,
  contentPosition: makeStringProp<DividerContentPosition>('center'),
}

export type DividerProps = ExtractPropTypes<typeof dividerProps>
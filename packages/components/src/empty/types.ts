import { ExtractPropTypes, PropType } from 'vue'
import { Numeric, makeStringProp } from '../utils'

export type EmptyThemeVars = {
  emptyPadding?: string
  emptyImageSize?: string
  emptyDescriptionMarginTop?: string
  emptyDescriptionPadding?: string
  emptyDescriptionColor?: string
  emptyDescriptionFontSize?: string
  emptyDescriptionLineHeight?: number | string
  emptyBottomMarginTop?: string
}

export const emptyProps = {
  image: makeStringProp('default'),
  imageSize: [Number, String, Array] as PropType<Numeric | [Numeric, Numeric]>,
  description: String,
}

export type EmptyProps = ExtractPropTypes<typeof emptyProps>
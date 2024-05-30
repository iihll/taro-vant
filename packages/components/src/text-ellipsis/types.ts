import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { makeNumericProp, makeStringProp } from '../utils'

export interface TextEllipsisExpose {
  toggle: (expanded?: boolean) => void
}

export type TextEllipsisInstance = ComponentPublicInstance<
  TextEllipsisProps,
  TextEllipsisExpose
>

export interface TextEllipsisThemeVars {
  textEllipsisActionColor?: string
}

export const textEllipsisProps = {
  rows: makeNumericProp(1),
  dots: makeStringProp('...'),
  content: makeStringProp(''),
  expandText: makeStringProp(''),
  collapseText: makeStringProp(''),
  position: makeStringProp('end'),
}

export type TextEllipsisProps = ExtractPropTypes<typeof textEllipsisProps>

import { ExtractPropTypes, PropType } from 'vue'
import { makeRequiredProp, makeStringProp, truthProp } from '../utils'

export type HighlightThemeVars = {
  highlightTagColor?: string
}

export const highlightProps = {
  autoEscape: truthProp,
  caseSensitive: Boolean,
  highlightClass: String,
  keywords: makeRequiredProp<PropType<string | string[]>>([String, Array]),
  sourceString: makeStringProp(''),
  unhighlightClass: String,
}

export type HighlightProps = ExtractPropTypes<typeof highlightProps>
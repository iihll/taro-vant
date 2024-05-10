import type { CSSProperties, ExtractPropTypes, ImgHTMLAttributes, PropType } from 'vue'
import { makeStringProp, numericProp, truthProp } from '../utils'

export type ImageFit = 'scaleToFill'
  | 'aspectFit'
  | 'aspectFill'
  | 'widthFix'
  | 'heightFix'
  | 'top'
  | 'bottom'
  | 'center'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'

export type ImagePosition = CSSProperties['objectPosition']

export type ImageThemeVars = {
  imagePlaceholderTextColor?: string
  imagePlaceholderFontSize?: string
  imagePlaceholderBackground?: string
  imageLoadingIconSize?: string
  imageLoadingIconColor?: string
  imageErrorIconSize?: string
  imageErrorIconColor?: string
}

export const imageProps = {
  src: String,
  alt: String,
  fit: String as PropType<ImageFit>,
  position: String as PropType<ImagePosition>,
  round: Boolean,
  block: Boolean,
  width: numericProp,
  height: numericProp,
  radius: numericProp,
  lazyLoad: Boolean,
  iconSize: numericProp,
  showError: truthProp,
  errorIcon: makeStringProp('photo-fail'),
  iconPrefix: String,
  showLoading: truthProp,
  loadingIcon: makeStringProp('photo'),
  crossorigin: String as PropType<ImgHTMLAttributes['crossorigin']>,
  referrerpolicy: String as PropType<ImgHTMLAttributes['referrerpolicy']>,
}

export type ImageProps = ExtractPropTypes<typeof imageProps>

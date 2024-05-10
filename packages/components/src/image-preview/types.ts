import type {
  CSSProperties,
  TeleportProps,
  ComponentPublicInstance,
  PropType,
  ExtractPropTypes,
} from 'vue'
import { makeArrayProp, makeNumericProp, makeStringProp, truthProp, unknownProp, type Interceptor } from '../utils'
import type { SwipeToOptions } from '../swipe'
import type { PopupCloseIconPosition } from '../popup'
import type { ImagePreviewProps } from './ImagePreview'
import type { ImagePreviewItemProps } from './ImagePreviewItem'

export type ImagePreviewOptions = {
  loop?: boolean
  images: string[]
  maxZoom?: number
  minZoom?: number
  vertical?: boolean
  teleport?: TeleportProps['to']
  className?: unknown
  showIndex?: boolean
  closeable?: boolean
  closeIcon?: string
  transition?: string
  beforeClose?: Interceptor
  doubleScale?: boolean
  overlayStyle?: CSSProperties
  overlayClass?: unknown
  swipeDuration?: number
  startPosition?: number
  showIndicators?: boolean
  closeOnPopstate?: boolean
  closeIconPosition?: PopupCloseIconPosition
  closeOnClickImage?: boolean
  closeOnClickOverlay?: boolean
  onClose?(): void
  onScale?(args: { scale: number; index: number }): void
  onChange?(index: number): void
}

export type ImagePreviewScaleEventParams = {
  scale: number
  index: number
}

type ImagePreviewItemExpose = {
  resetScale: () => void
}

export type ImagePreviewItemInstance = ComponentPublicInstance<
  ImagePreviewItemProps,
  ImagePreviewItemExpose
>

export type ImagePreviewExpose = {
  resetScale: () => void
  swipeTo: (index: number, options?: SwipeToOptions) => void
}

export type ImagePreviewInstance = ComponentPublicInstance<
  ImagePreviewProps,
  ImagePreviewExpose
>

export type ImagePreviewThemeVars = {
  imagePreviewIndexTextColor?: string
  imagePreviewIndexFontSize?: string
  imagePreviewIndexLineHeight?: number | string
  imagePreviewIndexTextShadow?: string
  imagePreviewOverlayBackground?: string
  imagePreviewCloseIconSize?: string
  imagePreviewCloseIconColor?: string
  imagePreviewCloseIconMargin?: string
  imagePreviewCloseIconZIndex?: number | string
}

// ImagePreview
export const imagePreviewProps = {
  show: Boolean,
  loop: truthProp,
  images: makeArrayProp<string>(),
  minZoom: makeNumericProp(1 / 3),
  maxZoom: makeNumericProp(3),
  overlay: truthProp,
  vertical: Boolean,
  closeable: Boolean,
  showIndex: truthProp,
  className: unknownProp,
  closeIcon: makeStringProp('clear'),
  transition: String,
  beforeClose: Function as PropType<Interceptor>,
  doubleScale: truthProp,
  overlayClass: unknownProp,
  overlayStyle: Object as PropType<CSSProperties>,
  swipeDuration: makeNumericProp(300),
  startPosition: makeNumericProp(0),
  showIndicators: Boolean,
  closeOnPopstate: truthProp,
  closeOnClickImage: truthProp,
  closeOnClickOverlay: truthProp,
  closeIconPosition: makeStringProp<PopupCloseIconPosition>('top-right'),
  teleport: [String, Object] as PropType<TeleportProps['to']>,
}

export type ImagePreviewProps = ExtractPropTypes<typeof imagePreviewProps>
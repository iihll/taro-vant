import _ImagePreview from './ImagePreview'

export const VanImagePreview = _ImagePreview
export default VanImagePreview
export { showImagePreview } from './function-call'

export { imagePreviewProps } from './types'
export type {
  ImagePreviewProps,
  ImagePreviewOptions,
  ImagePreviewInstance,
  ImagePreviewThemeVars,
  ImagePreviewScaleEventParams,
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanImagePreview: typeof VanImagePreview
  }
}

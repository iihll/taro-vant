import _Image from './Image'

export const VanImage = _Image
export default VanImage
export { imageProps } from './types'
export type { ImageProps, ImageFit, ImagePosition, ImageThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanImage: typeof VanImage
  }
}
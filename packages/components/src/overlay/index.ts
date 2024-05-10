import _Overlay from './Overlay'

export const VanOverlay = _Overlay
export default VanOverlay
export { overlayProps } from './Overlay'
export type { OverlayProps } from './Overlay'
export type { OverlayThemeVars } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanOverlay: typeof VanOverlay
  }
}

import _Popup from './Popup'

export const VanPopup = _Popup
export default VanPopup
export { popupProps } from './Popup'
export type { PopupProps } from './Popup'
export type {
  PopupPosition,
  PopupInstance,
  PopupThemeVars,
  PopupCloseIconPosition,
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanPopup: typeof VanPopup
  }
}

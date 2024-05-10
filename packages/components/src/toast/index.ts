import _Toast from './Toast'

export const VanToast = _Toast
export default VanToast
export { toastProps } from './Toast'
export {
  showToast,
  closeToast,
  showFailToast,
  showLoadingToast,
  showSuccessToast,
  allowMultipleToast,
  setToastDefaultOptions,
  resetToastDefaultOptions,
} from './function-call'
export const DefalutVanToastTeleportContainerId = 'van-toast-teleport-container'

export type { ToastProps } from './Toast'
export type {
  ToastType,
  ToastOptions,
  ToastPosition,
  ToastThemeVars,
  ToastWordBreak,
  ToastWrapperInstance,
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanToast: typeof VanToast
  }
}

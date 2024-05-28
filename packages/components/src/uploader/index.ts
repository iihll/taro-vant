import type { UploaderProps } from './Uploader'
import _Uploader from './Uploader'

export const VanUploader = _Uploader
export default VanUploader
export { uploaderProps } from './Uploader'
export type { UploaderProps }
export type {
  UploaderInstance,
  UploaderThemeVars,
  UploaderResultType,
  UploaderFileListItem,
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanUploader: typeof VanUploader
  }
}

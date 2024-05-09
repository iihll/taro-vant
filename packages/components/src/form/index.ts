import type { FormProps } from './Form'
import _Form from './Form'

export const VanForm = _Form
export default VanForm
export { formProps } from './Form'
export type { FormProps }
export type { FormInstance } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanForm: typeof VanForm
  }
}

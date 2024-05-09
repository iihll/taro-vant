import _Button from './Button'

export const VanButton = _Button
export default VanButton
export { buttonProps } from './Button'
export type { ButtonProps } from './Button'

declare module 'vue' {
  export interface GlobalComponents {
    VanButton: typeof VanButton
  }
}

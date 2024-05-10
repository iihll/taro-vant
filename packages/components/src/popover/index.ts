import _Popover from './Popover'

export const VanPopover = _Popover
export default VanPopover
export { popoverProps } from './types'
export type {
  PopoverTheme,
  PopoverAction,
  PopoverTrigger,
  PopoverThemeVars,
  PopoverPlacement,
  PopoverProps
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanPopover: typeof VanPopover
  }
}
import { CSSProperties, ExtractPropTypes, PropType, TeleportProps } from 'vue'
import { makeArrayProp, makeStringProp, numericProp, truthProp, unknownProp } from '../utils'

export type PopoverTheme = 'light' | 'dark'
export type PopoverActionsDirection = 'horizontal' | 'vertical'
export type PopoverTrigger = 'manual' | 'click'
export type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'

export type PopoverAction = {
  text: string
  icon?: string
  color?: string
  disabled?: boolean
  className?: string;
  [key: PropertyKey]: any
}

export type PopoverThemeVars = {
  popoverArrowSize?: string
  popoverRadius?: string
  popoverActionWidth?: string
  popoverActionHeight?: string
  popoverActionFontSize?: string
  popoverActionLineHeight?: number | string
  popoverActionIconSize?: string
  popoverLightTextColor?: string
  popoverLightBackground?: string
  popoverLightActionDisabledTextColor?: string
  popoverDarkTextColor?: string
  popoverDarkBackground?: string
  popoverDarkActionDisabledTextColor?: string
}

export const popoverProps = {
  show: Boolean,
  theme: makeStringProp<PopoverTheme>('light'),
  overlay: Boolean,
  actions: makeArrayProp<PopoverAction>(),
  actionsDirection: makeStringProp<PopoverActionsDirection>('vertical'),
  trigger: makeStringProp<PopoverTrigger>('click'),
  duration: numericProp,
  showArrow: truthProp,
  placement: makeStringProp<PopoverPlacement>('bottom'),
  iconPrefix: String,
  overlayClass: unknownProp,
  overlayStyle: Object as PropType<CSSProperties>,
  closeOnClickAction: truthProp,
  closeOnClickOverlay: truthProp,
  closeOnClickOutside: truthProp,
  offset: {
    type: Array as unknown as PropType<[number, number]>,
    default: () => [0, 8],
  },
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body',
  },
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>
import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { extend, numericProp, truthProp } from '../utils'
import { cellSharedProps } from '../cell/Cell'

export type CollapseItemExpose = {
  toggle: (newValue?: boolean) => void
}

export type CollapseItemInstance = ComponentPublicInstance<
  CollapseItemProps,
  CollapseItemExpose
>

export type CollapseItemThemeVars = {
  collapseItemDuration?: string
  collapseItemContentPadding?: string
  collapseItemContentFontSize?: string
  collapseItemContentLineHeight?: number | string
  collapseItemContentTextColor?: string
  collapseItemContentBackground?: string
  collapseItemTitleDisabledColor?: string
}

export const collapseItemProps = extend({}, cellSharedProps, {
  name: numericProp,
  isLink: truthProp,
  disabled: Boolean,
  readonly: Boolean,
  lazyRender: truthProp,
})

export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>
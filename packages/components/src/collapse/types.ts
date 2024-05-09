import { ComponentPublicInstance, ExtractPropTypes, InjectionKey, PropType } from 'vue'
import { Numeric, truthProp } from '../utils'

export type CollapseProvide = {
  toggle: (name: Numeric, expanded: boolean) => void
  isExpanded: (name: Numeric) => boolean
}

export type CollapseToggleAllOptions =
  | boolean
  | {
    expanded?: boolean
    skipDisabled?: boolean
  }

export const collapseProps = {
  border: truthProp,
  accordion: Boolean,
  modelValue: {
    type: [String, Number, Array] as PropType<Numeric | Numeric[]>,
    default: '',
  },
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>

export type CollapseInstance = ComponentPublicInstance<{
  toggleAll: (options?: boolean | CollapseToggleAllOptions) => void
}>
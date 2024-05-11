import {
  type ExtractPropTypes,
  type InjectionKey,
  type PropType,
  defineComponent,
  watch,
} from 'vue'
import './index.less'
import { View } from '@tarojs/components'

// Utils
import { useChildren, useCustomFieldValue } from '../vant-use'
import {
  createNamespace,
  makeArrayProp,
  makeStringProp,
  numericProp,
} from '../utils'

// Composables
import { useExpose } from '../composables/use-expose'

// Types
import type { CheckerDirection, CheckerShape } from '../checkbox/Checker'
import type {
  CheckboxGroupExpose,
  CheckboxGroupProvide,
  CheckboxGroupToggleAllOptions,
} from './types'

const [name, bem] = createNamespace('checkbox-group')

export const checkboxGroupProps = {
  max: numericProp,
  shape: makeStringProp<CheckerShape>('round'),
  disabled: Boolean,
  iconSize: numericProp,
  direction: String as PropType<CheckerDirection>,
  modelValue: makeArrayProp<unknown>(),
  checkedColor: String,
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>

export const CHECKBOX_GROUP_KEY: InjectionKey<CheckboxGroupProvide>
  = Symbol(name)

export default defineComponent({
  name,

  props: checkboxGroupProps,

  emits: ['change', 'update:modelValue'],

  setup(props, { emit, slots }) {
    const { children, linkChildren } = useChildren(CHECKBOX_GROUP_KEY)

    const updateValue = (value: unknown[]) => emit('update:modelValue', value)

    const toggleAll = (options: CheckboxGroupToggleAllOptions = {}) => {
      if (typeof options === 'boolean')
        options = { checked: options }

      const { checked, skipDisabled } = options

      const checkedChildren = children.filter((item: any) => {
        if (!item.props.bindGroup)
          return false

        if (item.props.disabled && skipDisabled)
          return item.checked.value

        return checked ?? !item.checked.value
      })

      const names = checkedChildren.map((item: any) => item.name)
      updateValue(names)
    }

    watch(
      () => props.modelValue,
      value => emit('change', value),
    )

    useExpose<CheckboxGroupExpose>({ toggleAll })
    useCustomFieldValue(() => props.modelValue)
    linkChildren({
      props,
      updateValue,
    })

    return () => <View class={bem([props.direction])}>{slots.default?.()}</View>
  },
})

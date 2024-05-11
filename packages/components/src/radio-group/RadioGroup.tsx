import {
  type ExtractPropTypes,
  type InjectionKey,
  type PropType,
  defineComponent,
  watch,
} from 'vue'
import './index.less'
import { View } from '@tarojs/components'
import { useChildren, useCustomFieldValue } from '../vant-use'
import { createNamespace, numericProp, unknownProp } from '../utils'

import type { RadioShape } from '../radio'
import type { CheckerDirection } from '../checkbox/Checker'

const [name, bem] = createNamespace('radio-group')

export type RadioGroupDirection = CheckerDirection

export const radioGroupProps = {
  shape: String as PropType<RadioShape>,
  disabled: Boolean,
  iconSize: numericProp,
  direction: String as PropType<RadioGroupDirection>,
  modelValue: unknownProp,
  checkedColor: String,
}

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export interface RadioGroupProvide {
  props: RadioGroupProps
  updateValue: (value: unknown) => void
}

export const RADIO_KEY: InjectionKey<RadioGroupProvide> = Symbol(name)

export default defineComponent({
  name,

  props: radioGroupProps,

  emits: ['change', 'update:modelValue'],

  setup(props, { emit, slots }) {
    const { linkChildren } = useChildren(RADIO_KEY)

    const updateValue = (value: unknown) => emit('update:modelValue', value)

    watch(
      () => props.modelValue,
      value => emit('change', value),
    )

    linkChildren({
      props,
      updateValue,
    })

    useCustomFieldValue(() => props.modelValue)

    return () => (
      <View class={bem([props.direction])} role="radiogroup">
        {slots.default?.()}
      </View>
    )
  },
})

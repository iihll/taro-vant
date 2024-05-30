import { type InjectionKey, defineComponent } from 'vue'
import { View } from '@tarojs/components'
import { useChildren } from '../vant-use'
import { createNamespace } from '../utils'
import type { StepsProvide } from './types'
import { stepsProps } from './types'
import './index.less'

const [name, bem] = createNamespace('steps')

export const STEPS_KEY: InjectionKey<StepsProvide> = Symbol(name)

export default defineComponent({
  name,
  props: stepsProps,
  emits: ['clickStep'],
  setup(props, { emit, slots }) {
    const { linkChildren } = useChildren(STEPS_KEY)

    const onClickStep = (index: number) => emit('clickStep', index)

    linkChildren({
      props,
      onClickStep,
    })

    return () => (
      <View class={bem([props.direction])}>
        <View class={bem('items')}>{slots.default?.()}</View>
      </View>
    )
  },
})

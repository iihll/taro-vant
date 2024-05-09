import { watch, computed, defineComponent } from 'vue'

// Utils
import {
  createNamespace,
} from '../utils'
import { parseFormat } from './utils'

// Composables
import { useCountDown } from '../vant-use'

import { countDownProps } from './types'

import { View } from '@tarojs/components'

const [name, bem] = createNamespace('count-down')

export default defineComponent({
  name,
  props: countDownProps,
  emits: ['change', 'finish'],
  setup(props, { emit, slots, expose }) {
    const { start, pause, reset, current } = useCountDown({
      time: +props.time,
      millisecond: props.millisecond,
      onChange: (current) => emit('change', current),
      onFinish: () => emit('finish'),
    })

    const timeText = computed(() => parseFormat(props.format, current.value))

    const resetTime = () => {
      reset(+props.time)

      if (props.autoStart) {
        start()
      }
    }

    watch(() => props.time, resetTime, { immediate: true })

    expose({
      start,
      pause,
      reset: resetTime,
    })

    return () => (
      <View role="timer" class={bem()}>
        {slots.default ? slots.default(current.value) : timeText.value}
      </View>
    )
  },
})

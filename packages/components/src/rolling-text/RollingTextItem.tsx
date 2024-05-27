import { computed, defineComponent } from 'vue'

// Utils
import { View } from '@tarojs/components'
import {
  addUnit,
  createNamespace,
} from '../utils'

// Types
import { rollingTextItemProps } from './types'

const [name, bem] = createNamespace('rolling-text-item')

export default defineComponent({
  name,
  props: rollingTextItemProps,
  setup(props) {
    const newFigureArr = computed(() =>
      props.direction === 'down'
        ? props.figureArr.slice().reverse()
        : props.figureArr,
    )
    const translatePx = computed(() => {
      const totalHeight = props.height * (props.figureArr.length - 1)
      return `-${totalHeight}px`
    })
    const itemStyle = computed(() => ({
      lineHeight: addUnit(props.height),
    }))
    const rootStyle = computed(() => ({
      'height': addUnit(props.height),
      '--van-translate': translatePx.value,
      '--van-duration': `${props.duration}s`,
      '--van-delay': `${props.delay}s`,
    }))

    return () => (
      <View class={bem([props.direction])} style={rootStyle.value}>
        <View class={bem('box', { animate: props.isStart })}>
          {Array.isArray(newFigureArr.value)
            && newFigureArr.value.map(figure => (
              <View class={bem('item')} style={itemStyle.value}>
                {figure}
              </View>
            ))}
        </View>
      </View>
    )
  },
})

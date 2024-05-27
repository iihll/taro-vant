import { computed, defineComponent } from 'vue'
import { Text, View } from '@tarojs/components'
import {
  addUnit,
  createNamespace,
} from '../utils'
import { progressProps } from './types'

import './index.less'

const [name, bem] = createNamespace('progress')

export default defineComponent({
  name,
  props: progressProps,
  setup(props) {
    const background = computed(() =>
      props.inactive ? undefined : props.color,
    )

    const renderPivot = () => {
      const { textColor, pivotText, pivotColor, percentage } = props
      const text = pivotText ?? `${percentage}%`

      if (props.showPivot && text) {
        const style = {
          color: textColor,
          left: `${+percentage}%`,
          transform: `translate(-${+percentage}%,-50%)`,
          background: pivotColor || background.value,
        }

        return (
          <Text
            style={style}
            class={bem('pivot', { inactive: props.inactive })}
          >
            {text}
          </Text>
        )
      }
    }

    return () => {
      const { trackColor, percentage, strokeWidth } = props
      const rootStyle = {
        background: trackColor,
        height: addUnit(strokeWidth),
      }
      const portionStyle = {
        width: `${percentage}%`,
        background: background.value,
      }

      return (
        <View class={bem()} style={rootStyle}>
          <Text
            class={bem('portion', { inactive: props.inactive })}
            style={portionStyle}
          />
          {renderPivot()}
        </View>
      )
    }
  },
})

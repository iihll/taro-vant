import { computed, defineComponent } from 'vue'
import { View, Text } from '@tarojs/components'
import {
  extend,
  addUnit,
  getSizeStyle,
  createNamespace,
} from '../utils'

import { loadingProps } from './types'
import './index.less'

const [name, bem] = createNamespace('loading')

const SpinIcon = Array(12)
  .fill(null)
  .map((_, index) => <Text class={bem('line', String(index + 1))} />)

const CircularIcon = (
  <view class={bem('circular')} />
  // <svg class={bem('circular')} viewBox="25 25 50 50">
  //   <circle cx="50" cy="50" r="20" fill="none" />
  // </svg>
)

export default defineComponent({
  name,

  props: loadingProps,

  setup(props, { slots }) {
    const spinnerStyle = computed(() =>
      extend({ color: props.color }, getSizeStyle(props.size)),
    )

    const renderIcon = () => {
      const DefaultIcon = props.type === 'spinner' ? SpinIcon : CircularIcon
      return (
        <Text class={bem('spinner', props.type)} style={spinnerStyle.value}>
          {slots.icon ? slots.icon() : DefaultIcon}
        </Text>
      )
    }

    const renderText = () => {
      if (slots.default) {
        return (
          <Text
            class={bem('text')}
            style={{
              fontSize: addUnit(props.textSize),
              color: props.textColor ?? props.color,
            }}
          >
            {slots.default()}
          </Text>
        )
      }
    }

    return () => {
      const { type, vertical } = props
      return (
        <View
          class={bem([type, { vertical }])}
          aria-live="polite"
          aria-busy={true}
        >
          {renderIcon()}
          {renderText()}
        </View>
      )
    }
  },
})

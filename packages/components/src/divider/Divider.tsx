import { defineComponent } from 'vue'
import { View } from '@tarojs/components'
import { createNamespace } from '../utils'
import { dividerProps } from './types'
import './index.less'

const [name, bem] = createNamespace('divider')

export default defineComponent({
  name,
  props: dividerProps,
  setup(props, { slots }) {
    return () => (
      <View
        role="separator"
        class={bem({
          dashed: props.dashed,
          hairline: props.hairline,
          vertical: props.vertical,
          [`content-${props.contentPosition}`]:
            !!slots.default && !props.vertical,
        })}
      >
        {!props.vertical && slots.default?.()}
      </View>
    )
  },
})

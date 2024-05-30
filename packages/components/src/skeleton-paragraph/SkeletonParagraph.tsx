import { defineComponent } from 'vue'
import { View } from '@tarojs/components'

import { createNamespace } from '../utils'
import { skeletonParagraphProps } from './types'
import './index.less'

const [name, bem] = createNamespace('skeleton-paragraph')

export default defineComponent({
  name,
  props: skeletonParagraphProps,
  setup(props) {
    return () => (
      <View
        class={bem([{ round: props.round }])}
        style={{ width: props.rowWidth }}
      />
    )
  },
})

import { defineComponent } from 'vue'
import { View } from '@tarojs/components'
import { addUnit, createNamespace } from '../utils'
import { skeletonTitleProps } from './types'
import './index.less'

const [name, bem] = createNamespace('skeleton-title')

export default defineComponent({
  name,
  props: skeletonTitleProps,
  setup(props) {
    return () => (
      <View
        class={bem([{ round: props.round }])}
        style={{ width: addUnit(props.titleWidth) }}
      />
    )
  },
})

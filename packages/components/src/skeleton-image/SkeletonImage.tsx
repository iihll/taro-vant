import { defineComponent } from 'vue'
import { View } from '@tarojs/components'
import {
  createNamespace,
  getSizeStyle,
} from '../utils'
import { VanIcon } from '../icon'
import { skeletonImageProps } from './types'
import './index.less'

const [name, bem] = createNamespace('skeleton-image')

export default defineComponent({
  name,
  props: skeletonImageProps,
  setup(props) {
    return () => (
      <View
        class={bem([props.imageShape])}
        style={getSizeStyle(props.imageSize)}
      >
        <VanIcon name={'photo'} class={bem('icon')} />
      </View>
    )
  },
})

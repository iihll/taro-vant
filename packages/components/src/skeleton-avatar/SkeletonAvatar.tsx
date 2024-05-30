import { defineComponent } from 'vue'
import { View } from '@tarojs/components'
import {
  createNamespace,
  getSizeStyle,
} from '../utils'
import { skeletonAvatarProps } from './types'
import './index.less'

const [name, bem] = createNamespace('skeleton-avatar')

export default defineComponent({
  name,

  props: skeletonAvatarProps,

  setup(props) {
    return () => (
      <View
        class={bem([props.avatarShape])}
        style={getSizeStyle(props.avatarSize)}
      />
    )
  },
})

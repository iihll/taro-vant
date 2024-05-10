import { defineComponent } from 'vue'
import { View } from '@tarojs/components'
import {
  getSizeStyle,
  createNamespace,
} from '../utils'
import Error from './assets/error.png'
import Network from './assets/network.png'
import Search from './assets/search.png'
import Default from './assets/default.png'
import { emptyProps } from './types'
import './index.less'

const [name, bem] = createNamespace('empty')

const PRESET_IMAGES: Record<string, string> = {
  error: Error,
  search: Search,
  network: Network,
  default: Default,
}

export default defineComponent({
  name,
  props: emptyProps,
  setup(props, { slots }) {
    const renderDescription = () => {
      const description = slots.description
        ? slots.description()
        : props.description

      if (description) {
        return <View class={bem('description')}>{description}</View>
      }
    }

    const renderBottom = () => {
      if (slots.default) {
        return <View class={bem('bottom')}>{slots.default()}</View>
      }
    }

    const renderImage = () => {
      if (slots.image) {
        return slots.image()
      }

      // return <img src="./assets/error.png" />
      return <img src={PRESET_IMAGES[props.image] || props.image} />
    }

    return () => (
      <View class={bem()}>
        <View class={bem('image')} style={getSizeStyle(props.imageSize)}>
          {renderImage()}
        </View>
        {renderDescription()}
        {renderBottom()}
      </View>
    )
  },
})

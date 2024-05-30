import { defineComponent } from 'vue'
import { View } from '@tarojs/components'

// Utils
import {
  addUnit,
  createNamespace,
} from '../utils'

// Components
import SkeletonTitle from '../skeleton-title'
import SkeletonAvatar from '../skeleton-avatar'
import SkeletonParagraph, { DEFAULT_ROW_WIDTH } from '../skeleton-paragraph'

// Types
import { skeletonProps } from './types'

import './index.less'

const [name, bem] = createNamespace('skeleton')
const DEFAULT_LAST_ROW_WIDTH = '60%'

export default defineComponent({
  name,
  inheritAttrs: false,
  props: skeletonProps,
  setup(props, { slots, attrs }) {
    const renderAvatar = () => {
      if (props.avatar) {
        return (
          <SkeletonAvatar
            avatarShape={props.avatarShape}
            avatarSize={props.avatarSize}
          />
        )
      }
    }

    const renderTitle = () => {
      if (props.title) {
        return (
          <SkeletonTitle round={props.round} titleWidth={props.titleWidth} />
        )
      }
    }

    const getRowWidth = (index: number) => {
      const { rowWidth } = props

      if (rowWidth === DEFAULT_ROW_WIDTH && index === +props.row - 1)
        return DEFAULT_LAST_ROW_WIDTH

      if (Array.isArray(rowWidth))
        return rowWidth[index]

      return rowWidth
    }

    const renderRows = () =>
      Array(+props.row)
        .fill('')
        .map((_, i) => (
          <SkeletonParagraph
            key={i}
            round={props.round}
            rowWidth={addUnit(getRowWidth(i))}
          />
        ))

    const renderContents = () => {
      if (slots.template)
        return slots.template()

      return (
        <>
          {renderAvatar()}
          <View class={bem('content')}>
            {renderTitle()}
            {renderRows()}
          </View>
        </>
      )
    }

    return () => {
      if (!props.loading)
        return slots.default?.()

      return (
        <View
          class={bem({ animate: props.animate, round: props.round })}
          {...attrs}
        >
          {renderContents()}
        </View>
      )
    }
  },
})

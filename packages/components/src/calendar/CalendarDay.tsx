import {
  type CSSProperties,
  type PropType,
  computed,
  defineComponent,
} from 'vue'
import { View } from '@tarojs/components'
import { createNamespace, makeNumberProp, makeRequiredProp } from '../utils'
import { bem } from './utils'
import type { CalendarDayItem } from './types'

const [name] = createNamespace('calendar-day')

export default defineComponent({
  name,

  props: {
    item: makeRequiredProp<PropType<CalendarDayItem>>(Object),
    color: String,
    index: Number,
    offset: makeNumberProp(0),
    rowHeight: String,
  },

  emits: ['click', 'clickDisabledDate'],

  setup(props, { emit, slots }) {
    const style = computed(() => {
      const { item, index, color, offset, rowHeight } = props
      const style: CSSProperties = {
        height: rowHeight,
      }

      if (item.type === 'placeholder') {
        style.width = '100%'
        return style
      }

      if (index === 0)
        style.marginLeft = `${(100 * offset) / 7}%`

      if (color) {
        switch (item.type) {
          case 'end':
          case 'start':
          case 'start-end':
          case 'multiple-middle':
          case 'multiple-selected':
            style.background = color
            break
          case 'middle':
            style.color = color
            break
        }
      }

      if (offset + (item.date?.getDate() || 1) > 28)
        style.marginBottom = 0

      return style
    })

    const onClick = () => {
      if (props.item.type !== 'disabled')
        emit('click', props.item)
      else
        emit('clickDisabledDate', props.item)
    }

    const renderTopInfo = () => {
      const { topInfo } = props.item

      if (topInfo || slots['top-info']) {
        return (
          <View class={bem('top-info')}>
            {slots['top-info'] ? slots['top-info'](props.item) : topInfo}
          </View>
        )
      }
    }

    const renderBottomInfo = () => {
      const { bottomInfo } = props.item

      if (bottomInfo || slots['bottom-info']) {
        return (
          <View class={bem('bottom-info')}>
            {slots['bottom-info']
              ? slots['bottom-info'](props.item)
              : bottomInfo}
          </View>
        )
      }
    }

    const renderContent = () => {
      const { item, color, rowHeight } = props
      const { type, text } = item

      const Nodes = [renderTopInfo(), text, renderBottomInfo()]

      if (type === 'selected') {
        return (
          <View
            class={bem('selected-day')}
            style={{
              width: rowHeight,
              height: rowHeight,
              background: color,
            }}
          >
            {Nodes}
          </View>
        )
      }

      return Nodes
    }

    return () => {
      const { type, className } = props.item

      if (type === 'placeholder')
        return <View class={bem('day')} style={style.value} />

      return (
        <View
          role="gridcell"
          style={style.value}
          class={[bem('day', type), className]}
          tabindex={type === 'disabled' ? undefined : -1}
          onClick={onClick}
        >
          {renderContent()}
        </View>
      )
    }
  },
})

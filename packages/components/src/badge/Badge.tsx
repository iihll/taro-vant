import {
  type CSSProperties,
  type ExtractPropTypes,
  type PropType,
  computed,
  defineComponent,
} from 'vue'
import { View } from '@tarojs/components'
import {
  type Numeric,
  addUnit,
  createNamespace,
  isDef,
  isNumeric,
  makeStringProp,
  numericProp,
  truthProp,
} from '../utils'
import './index.less'

const [name, bem] = createNamespace('badge')

export type BadgePosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

export const badgeProps = {
  dot: Boolean,
  max: numericProp,
  tag: makeStringProp<keyof HTMLElementTagNameMap>('div'),
  color: String,
  offset: Array as unknown as PropType<[Numeric, Numeric]>,
  content: numericProp,
  showZero: truthProp,
  position: makeStringProp<BadgePosition>('top-right'),
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>

export default defineComponent({
  name,

  props: badgeProps,

  emits: ['click'],

  setup(props, { slots, emit }) {
    const onClick = () => {
      emit('click')
    }

    const hasContent = () => {
      if (slots.content)
        return true

      const { content, showZero } = props
      return (
        isDef(content)
        && content !== ''
        && (showZero || (content !== 0 && content !== '0'))
      )
    }

    const renderContent = () => {
      const { dot, max, content } = props

      if (!dot && hasContent()) {
        if (slots.content)
          return slots.content()

        if (isDef(max) && isNumeric(content!) && +content > +max)
          return `${max}+`

        return content
      }
    }

    const getOffsetWithMinusString = (val: string) =>
      val.startsWith('-') ? val.replace('-', '') : `-${val}`

    const style = computed(() => {
      const style: CSSProperties = {
        background: props.color,
      }

      if (props.offset) {
        const [x, y] = props.offset
        const { position } = props
        const [offsetY, offsetX] = position.split('-') as [
          'top' | 'bottom',
          'left' | 'right',
        ]

        if (slots.default) {
          if (typeof y === 'number') {
            style[offsetY] = addUnit(offsetY === 'top' ? y : -y)
          }
          else {
            style[offsetY]
              = offsetY === 'top' ? addUnit(y) : getOffsetWithMinusString(y)
          }

          if (typeof x === 'number') {
            style[offsetX] = addUnit(offsetX === 'left' ? x : -x)
          }
          else {
            style[offsetX]
              = offsetX === 'left' ? addUnit(x) : getOffsetWithMinusString(x)
          }
        }
        else {
          style.marginTop = addUnit(y)
          style.marginLeft = addUnit(x)
        }
      }

      return style
    })

    const renderBadge = () => {
      if (hasContent() || props.dot) {
        return (
          <View
            class={bem([
              props.position,
              { dot: props.dot, fixed: !!slots.default },
            ])}
            style={style.value}
            onTap={onClick}
          >
            {renderContent()}
          </View>
        )
      }
    }

    return () => {
      if (slots.default) {
        return (
          <View class={bem('wrapper')} onTap={onClick}>
            {slots.default()}
            {renderBadge()}
          </View>
        )
      }

      return renderBadge()
    }
  },
})

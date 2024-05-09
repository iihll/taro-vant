import {
  type CSSProperties,
  type ExtractPropTypes,
  type PropType,
  Transition,
  defineComponent,
} from 'vue'
import { Text } from '@tarojs/components'
import {
  HAPTICS_FEEDBACK,
  createNamespace,
  makeStringProp,
  truthProp,
} from '../utils'
import { Icon } from '../icon'
import type { TagSize, TagType } from './types'
import './index.less'

const [name, bem] = createNamespace('tag')

export const tagProps = {
  size: String as PropType<TagSize>,
  mark: Boolean,
  show: truthProp,
  type: makeStringProp<TagType>('default'),
  color: String,
  plain: Boolean,
  round: Boolean,
  textColor: String,
  closeable: Boolean,
}

export type TagProps = ExtractPropTypes<typeof tagProps>

export default defineComponent({
  name,

  props: tagProps,

  emits: ['close'],

  setup(props, { slots, emit }) {
    const onClose = (event: MouseEvent) => {
      event.stopPropagation()
      emit('close', event)
    }

    const getStyle = (): CSSProperties => {
      if (props.plain) {
        return {
          color: props.textColor || props.color,
          borderColor: props.color,
        }
      }
      return {
        color: props.textColor,
        background: props.color,
      }
    }

    const renderTag = () => {
      const { type, mark, plain, round, size, closeable } = props

      const classes: Record<string, unknown> = {
        mark,
        plain,
        round,
      }
      if (size)
        classes[size] = size

      const CloseIcon = closeable && (
        <Icon
          name="cross"
          class={[bem('close'), HAPTICS_FEEDBACK]}
          onClick={onClose}
        />
      )

      return (
        <Text style={getStyle()} class={bem([classes, type])}>
          {slots.default?.()}
          {CloseIcon}
        </Text>
      )
    }

    return () => (
      <Transition name={props.closeable ? 'van-fade' : undefined}>
        {props.show ? renderTag() : null}
      </Transition>
    )
  },
})

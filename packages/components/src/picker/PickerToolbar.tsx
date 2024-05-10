import { defineComponent } from 'vue'
import { View } from '@tarojs/components'
import { HAPTICS_FEEDBACK, createNamespace } from '../utils'
import { bem, t } from './utils'

const [name] = createNamespace('picker-toolbar')

export const pickerToolbarProps = {
  title: String,
  cancelButtonText: String,
  confirmButtonText: String,
}

export const pickerToolbarSlots = ['cancel', 'confirm', 'title', 'toolbar']

export type PickerToolbarPropKeys = Array<keyof typeof pickerToolbarProps>

export const pickerToolbarPropKeys = Object.keys(
  pickerToolbarProps,
) as PickerToolbarPropKeys

export default defineComponent({
  name,

  props: pickerToolbarProps,

  emits: ['confirm', 'cancel'],

  setup(props, { emit, slots }) {
    const renderTitle = () => {
      if (slots.title)
        return slots.title()

      if (props.title)
        return <View class={[bem('title'), 'van-ellipsis']}>{props.title}</View>
    }

    const onCancel = () => emit('cancel')
    const onConfirm = () => emit('confirm')

    const renderCancel = () => {
      const text = props.cancelButtonText ?? t('cancel')

      if (!slots.cancel && !text)
        return

      return (
        <View
          class={[bem('cancel'), HAPTICS_FEEDBACK]}
          onClick={onCancel}
        >
          {slots.cancel ? slots.cancel() : text}
        </View>
      )
    }

    const renderConfirm = () => {
      const text = props.confirmButtonText ?? t('confirm')

      if (!slots.confirm && !text)
        return

      return (
        <View
          class={[bem('confirm'), HAPTICS_FEEDBACK]}
          onClick={onConfirm}
        >
          {slots.confirm ? slots.confirm() : text}
        </View>
      )
    }

    return () => (
      <View class={bem('toolbar')}>
        {slots.toolbar
          ? slots.toolbar()
          : [renderCancel(), renderTitle(), renderConfirm()]}
      </View>
    )
  },
})

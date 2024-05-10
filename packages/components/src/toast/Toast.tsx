import {
  type CSSProperties,
  type ExtractPropTypes,
  type PropType,
  type TeleportProps,
  defineComponent,
  onMounted,
  onUnmounted,
  watch,
} from 'vue'
import './index.less'
import { View } from '@tarojs/components'

// Utils
import {
  createNamespace,
  isDef,
  makeNumberProp,
  makeStringProp,
  numericProp,
  pick,
  unknownProp,
} from '../utils'

// Components
import { VanIcon } from '../icon'
import { VanPopup } from '../popup'
import type { LoadingType } from '../loading'
import { VanLoading } from '../loading'
import { lockClick } from './lock-click'

// Types
import type { ToastPosition, ToastType, ToastWordBreak } from './types'

const [name, bem] = createNamespace('toast')

const popupInheritProps = [
  'show',
  'overlay',
  'teleport',
  'transition',
  'overlayClass',
  'overlayStyle',
  'closeOnClickOverlay',
  'zIndex',
] as const

export const toastProps = {
  icon: String,
  show: Boolean,
  type: makeStringProp<ToastType>('text'),
  overlay: Boolean,
  message: numericProp,
  iconSize: numericProp,
  duration: makeNumberProp(2000),
  position: makeStringProp<ToastPosition>('middle'),
  teleport: [String, Object] as PropType<TeleportProps['to']>,
  wordBreak: String as PropType<ToastWordBreak>,
  className: unknownProp,
  iconPrefix: String,
  transition: makeStringProp('van-fade'),
  loadingType: String as PropType<LoadingType>,
  forbidClick: Boolean,
  overlayClass: unknownProp,
  overlayStyle: Object as PropType<CSSProperties>,
  closeOnClick: Boolean,
  closeOnClickOverlay: Boolean,
  zIndex: numericProp,
}

export type ToastProps = ExtractPropTypes<typeof toastProps>

export default defineComponent({
  name,

  props: toastProps,

  emits: ['update:show'],

  setup(props, { emit, slots }) {
    let timer: ReturnType<typeof setTimeout>
    let clickable = false

    const toggleClickable = () => {
      const newValue = props.show && props.forbidClick
      if (clickable !== newValue) {
        clickable = newValue
        lockClick(clickable)
      }
    }

    const updateShow = (show: boolean) => emit('update:show', show)

    const onClick = () => {
      if (props.closeOnClick)
        updateShow(false)
    }

    const clearTimer = () => clearTimeout(timer)

    const renderIcon = () => {
      const { icon, type, iconSize, iconPrefix, loadingType } = props
      const hasIcon = icon || type === 'success' || type === 'fail'

      if (hasIcon) {
        return (
          <VanIcon
            name={icon || type}
            size={iconSize}
            class={bem('icon')}
            classPrefix={iconPrefix}
          />
        )
      }

      if (type === 'loading') {
        return (
          <VanLoading class={bem('loading')} size={iconSize} type={loadingType} />
        )
      }
    }

    const renderMessage = () => {
      const { type, message } = props

      if (slots.message)
        return <View class={bem('text')}>{slots.message()}</View>

      if (isDef(message) && message !== '') {
        return type === 'html'
          ? (
          <View key={0} class={bem('text')} innerHTML={String(message)} />
            )
          : (
          <View class={bem('text')}>{message}</View>
            )
      }
    }

    watch(() => [props.show, props.forbidClick], toggleClickable)

    watch(
      () => [props.show, props.type, props.message, props.duration],
      () => {
        clearTimer()
        if (props.show && props.duration > 0) {
          timer = setTimeout(() => {
            updateShow(false)
          }, props.duration)
        }
      },
    )

    onMounted(toggleClickable)
    onUnmounted(toggleClickable)

    return () => (
      <VanPopup
        class={[
          bem([
            props.position,
            props.wordBreak === 'normal' ? 'break-normal' : props.wordBreak,
            { [props.type]: !props.icon },
          ]),
          props.className,
        ]}
        lockScroll={false}
        onClick={onClick}
        onClosed={clearTimer}
        onUpdate:show={updateShow}
        {...pick(props, popupInheritProps)}
      >
        {renderIcon()}
        {renderMessage()}
      </VanPopup>
    )
  },
})

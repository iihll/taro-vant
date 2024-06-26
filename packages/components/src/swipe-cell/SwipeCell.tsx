import {
  computed,
  defineComponent,
  reactive,
  ref,
} from 'vue'
import type {
  type ExtractPropTypes,
  type PropType,
  Ref,
} from 'vue'
import './index.less'
import { View } from '@tarojs/components'

// Utils
import type { Interceptor } from '../utils'
import {
  callInterceptor,
  clamp,
  createNamespace,
  isDef,
  makeNumericProp,
  numericProp,
  preventDefault,
} from '../utils'

// Composables
import { useClickAway, useEventListener, useTaroRect } from '../vant-use'
import { useTouch } from '../composables/use-touch'
import { useExpose } from '../composables/use-expose'

// Types
import type {
  SwipeCellExpose,
  SwipeCellPosition,
  SwipeCellSide,
} from './types'

const [name, bem] = createNamespace('swipe-cell')

export const swipeCellProps = {
  name: makeNumericProp(''),
  disabled: Boolean,
  leftWidth: numericProp,
  rightWidth: numericProp,
  beforeClose: Function as PropType<Interceptor>,
  stopPropagation: Boolean,
}

export type SwipeCellProps = ExtractPropTypes<typeof swipeCellProps>

export default defineComponent({
  name,

  props: swipeCellProps,

  emits: ['open', 'close', 'click'],

  setup(props, { emit, slots }) {
    let opened: boolean
    let lockClick: boolean
    let startOffset: number
    let isInBeforeClosing: boolean

    const root = ref<HTMLElement>()
    const leftRef = ref<HTMLElement>()
    const rightRef = ref<HTMLElement>()

    const state = reactive({
      offset: 0,
      dragging: false,
    })

    const touch = useTouch()

    // const getWidthByRef = (ref: Ref<HTMLElement | undefined>) =>
    //   ref.value ? useRect(ref).width : 0;

    const getWidthByRef = async (side: SwipeCellSide) => {
      const res = await useTaroRect(`#van-swipe-cell-${side}`)
      return res.width || 0
    }

    const leftWidth = computed(() =>
      isDef(props.leftWidth) ? +props.leftWidth : getWidthByRef('left'),
    )
    const getLeftWidth = async () => {
      if (isDef(props.leftWidth))
        return +props.leftWidth
      else
        return await getWidthByRef('left')
    }

    const rightWidth = computed(() =>
      isDef(props.rightWidth) ? +props.rightWidth : getWidthByRef('right'),
    )
    const getRightWidth = async () => {
      if (isDef(props.rightWidth))
        return +props.rightWidth
      else
        return await getWidthByRef('right')
    }

    const open = async (side: SwipeCellSide) => {
      state.offset = side === 'left' ? await getLeftWidth() : -(await getRightWidth())

      if (!opened) {
        opened = true
        emit('open', {
          name: props.name,
          position: side,
        })
      }
    }

    const close = (position: SwipeCellPosition) => {
      state.offset = 0

      if (opened) {
        opened = false
        emit('close', {
          name: props.name,
          position,
        })
      }
    }

    const toggle = async (side: SwipeCellSide) => {
      const offset = Math.abs(state.offset)
      const THRESHOLD = 0.15
      const threshold = opened ? 1 - THRESHOLD : THRESHOLD
      const width = side === 'left' ? await getLeftWidth() : await getRightWidth()

      if (width && offset > width * threshold)
        open(side)
      else
        close(side)
    }

    const onTouchStart = (event: TouchEvent) => {
      if (!props.disabled) {
        startOffset = state.offset
        touch.start(event)
      }
    }

    const onTouchMove = async (event: TouchEvent) => {
      if (props.disabled)
        return

      const { deltaX } = touch
      touch.move(event)

      if (touch.isHorizontal()) {
        lockClick = true
        state.dragging = true

        const isEdge = !opened || deltaX.value * startOffset < 0
        if (isEdge)
          preventDefault(event, props.stopPropagation)

        state.offset = clamp(
          deltaX.value + startOffset,
          -(await getRightWidth()),
          await getLeftWidth(),
        )
      }
    }

    const onTouchEnd = () => {
      if (state.dragging) {
        state.dragging = false
        toggle(state.offset > 0 ? 'left' : 'right')

        // compatible with desktop scenario
        setTimeout(() => {
          lockClick = false
        }, 0)
      }
    }

    const onClick = (position: SwipeCellPosition = 'outside') => {
      if (isInBeforeClosing)
        return

      emit('click', position)

      if (opened && !lockClick) {
        isInBeforeClosing = true
        callInterceptor(props.beforeClose, {
          args: [
            {
              name: props.name,
              position,
            },
          ],
          done: () => {
            isInBeforeClosing = false
            close(position)
          },
          canceled: () => (isInBeforeClosing = false),
          error: () => (isInBeforeClosing = false),
        })
      }
    }

    const getClickHandler
      = (position: SwipeCellPosition, stop?: boolean) => (event: MouseEvent) => {
        if (stop)
          event.stopPropagation()

        onClick(position)
      }

    const renderSideContent = (
      side: SwipeCellSide,
      ref: Ref<HTMLElement | undefined>,
    ) => {
      const contentSlot = slots[side]
      if (contentSlot) {
        return (
          <View
            id={`van-swipe-cell-${side}`}
            ref={ref}
            class={bem(side)}
            onClick={getClickHandler(side, true)}
          >
            {contentSlot()}
          </View>
        )
      }
    }

    useExpose<SwipeCellExpose>({
      open,
      close,
    })

    useClickAway(root, () => onClick('outside'), { eventName: 'touchstart' })

    // useEventListener will set passive to `false` to eliminate the warning of Chrome
    useEventListener('touchmove', onTouchMove, {
      target: root,
    })

    return () => {
      const wrapperStyle = {
        transform: `translate3d(${state.offset}px, 0, 0)`,
        transitionDuration: state.dragging ? '0s' : '.6s',
      }

      return (
        <View
          ref={root}
          class={bem()}
          onClick={getClickHandler('cell', lockClick)}
          onTouchstartPassive={onTouchStart}
          onTouchend={onTouchEnd}
          onTouchcancel={onTouchEnd}
        >
          <View class={bem('wrapper')} style={wrapperStyle}>
            {renderSideContent('left', leftRef)}
            {slots.default?.()}
            {renderSideContent('right', rightRef)}
          </View>
        </View>
      )
    }
  },
})

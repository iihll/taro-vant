import {
  type CSSProperties,
  type ExtractPropTypes,
  type PropType,
  Transition,
  defineComponent,
  ref,
} from 'vue'
import './index.less'
import type { CommonEventFunction } from '@tarojs/components'
import { View } from '@tarojs/components'

// Utils
import {
  createNamespace,
  extend,
  getZIndexStyle,
  isDef,
  numericProp,
  preventDefault,
  truthProp,
  unknownProp,
} from '../utils'

// Composables
import { useLazyRender } from '../composables/use-lazy-render'

const [name, bem] = createNamespace('overlay')

export const overlayProps = {
  show: Boolean,
  zIndex: numericProp,
  duration: numericProp,
  className: unknownProp,
  lockScroll: truthProp,
  lazyRender: truthProp,
  customStyle: Object as PropType<CSSProperties>,
}

export type OverlayProps = ExtractPropTypes<typeof overlayProps>

export default defineComponent({
  name,

  props: overlayProps,

  emits: ['click'],

  setup(props, { slots, emit }) {
    const root = ref<HTMLElement>()
    const lazyRender = useLazyRender(() => props.show || !props.lazyRender)

    const onTouchMove: CommonEventFunction = (event) => {
      if (props.lockScroll)
        preventDefault(event, true)
    }

    const renderOverlay = lazyRender(() => {
      const style: CSSProperties = extend(
        getZIndexStyle(props.zIndex),
        props.customStyle,
      )

      if (isDef(props.duration))
        style.animationDuration = `${props.duration}s`

      return (
        <View
          v-show={props.show}
          ref={root}
          style={style}
          class={[bem(), props.className]}
          onTap={() => { emit('click') }}
          onTouchmove={onTouchMove}
        >
          {slots.default?.()}
        </View>
      )
    })

    return () => (
      <Transition v-slots={{ default: renderOverlay }} name="van-fade" appear />
    )
  },
})

import {
  ref,
  watch,
  nextTick,
  reactive,
  defineComponent,
} from 'vue'
import { View } from '@tarojs/components'

// Utils
import {
  pick,
  callInterceptor,
  createNamespace,
  HAPTICS_FEEDBACK,
} from '../utils'

// Composables
import { useExpose } from '../composables/use-expose'

// Components
import { VanIcon } from '../icon'
import { VanSwipe, SwipeInstance, SwipeToOptions } from '../swipe'
import { VanPopup } from '../popup'
import ImagePreviewItem from './ImagePreviewItem'

// Types
import {
  ImagePreviewScaleEventParams,
  ImagePreviewItemInstance,
  imagePreviewProps,
} from './types'

import './index.less'

const [name, bem] = createNamespace('image-preview')

const popupProps = [
  'show',
  'teleport',
  'transition',
  'overlayStyle',
  'closeOnPopstate',
] as const

export default defineComponent({
  name,

  props: imagePreviewProps,

  emits: ['scale', 'close', 'closed', 'change', 'longPress', 'update:show'],

  setup(props, { emit, slots }) {
    const swipeRef = ref<SwipeInstance>()
    const activedPreviewItemRef = ref<ImagePreviewItemInstance>()

    const state = reactive({
      active: 0,
      rootWidth: 0,
      rootHeight: 0,
      disableZoom: false,
    })

    const emitScale = (args: ImagePreviewScaleEventParams) =>
      emit('scale', args)

    const updateShow = (show: boolean) => emit('update:show', show)

    const emitClose = () => {
      callInterceptor(props.beforeClose, {
        args: [state.active],
        done: () => updateShow(false),
      })
    }

    const setActive = (active: number) => {
      if (active !== state.active) {
        state.active = active
        emit('change', active)
      }
    }

    const renderIndex = () => {
      if (props.showIndex) {
        return (
          <View class={bem('index')}>
            {slots.index
              ? slots.index({ index: state.active })
              : `${state.active + 1} / ${props.images.length}`}
          </View>
        )
      }
    }

    const renderCover = () => {
      if (slots.cover) {
        return <View class={bem('cover')}>{slots.cover()}</View>
      }
    }

    const onDragStart = () => {
      state.disableZoom = true
    }

    const onDragEnd = () => {
      state.disableZoom = false
    }

    const renderImages = () => (
      <VanSwipe
        ref={swipeRef}
        lazyRender
        loop={props.loop}
        class={bem('swipe')}
        vertical={props.vertical}
        duration={props.swipeDuration}
        initialSwipe={props.startPosition}
        showIndicators={props.showIndicators}
        indicatorColor="white"
        onChange={setActive}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
      >
        {props.images.map((image, index) => (
          <ImagePreviewItem
            v-slots={{
              image: slots.image,
            }}
            ref={(item) => {
              if (index === state.active) {
                activedPreviewItemRef.value = item as ImagePreviewItemInstance
              }
            }}
            src={image}
            show={props.show}
            active={state.active}
            maxZoom={props.maxZoom}
            minZoom={props.minZoom}
            rootWidth={state.rootWidth}
            rootHeight={state.rootHeight}
            disableZoom={state.disableZoom}
            doubleScale={props.doubleScale}
            closeOnClickImage={props.closeOnClickImage}
            closeOnClickOverlay={props.closeOnClickOverlay}
            vertical={props.vertical}
            onScale={emitScale}
            onClose={emitClose}
            onLongPress={() => emit('longPress', { index })}
          />
        ))}
      </VanSwipe>
    )

    const renderClose = () => {
      if (props.closeable) {
        return (
          <VanIcon
            role="button"
            name={props.closeIcon}
            class={[
              bem('close-icon', props.closeIconPosition),
              HAPTICS_FEEDBACK,
            ]}
            onClick={emitClose}
          />
        )
      }
    }

    const onClosed = () => emit('closed')

    const swipeTo = (index: number, options?: SwipeToOptions) =>
      swipeRef.value?.swipeTo(index, options)

    useExpose({
      resetScale: () => {
        activedPreviewItemRef.value?.resetScale()
      },
      swipeTo,
    })

    watch(
      () => props.startPosition,
      (value) => setActive(+value),
    )

    watch(
      () => props.show,
      (value) => {
        const { images, startPosition } = props
        if (value) {
          setActive(+startPosition)
          nextTick(() => {
            swipeTo(+startPosition, { immediate: true })
          })
        } else {
          emit('close', {
            index: state.active,
            url: images[state.active],
          })
        }
      },
    )

    return () => (
      <VanPopup
        class={[bem(), props.className]}
        overlayClass={[bem('overlay'), props.overlayClass]}
        onClosed={onClosed}
        onUpdate:show={updateShow}
        {...pick(props, popupProps)}
      >
        {renderClose()}
        {renderImages()}
        {renderIndex()}
        {renderCover()}
      </VanPopup>
    )
  },
})

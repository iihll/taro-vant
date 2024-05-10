import {
  ref,
  watch,
  computed,
  nextTick,
  onMounted,
  onBeforeUnmount,
  defineComponent,
  getCurrentInstance,
  type Slot,
  type CSSProperties,
  PropType,
} from 'vue'
import { View } from '@tarojs/components'

// Utils
import {
  isDef,
  addUnit,
  inBrowser,
  createNamespace,
} from '../utils'

// Components
import { Icon } from '../icon'

import { ImageFit, imageProps } from './types'

import './index.less'

const [name, bem] = createNamespace('image')

export default defineComponent({
  name,
  props: imageProps,
  emits: ['load', 'error'],
  setup(props, { emit, slots }) {
    const error = ref(false)
    const loading = ref(true)
    const imageRef = ref<HTMLImageElement>()

    const { $Lazyload } = getCurrentInstance()!.proxy!

    const style = computed(() => {
      const style: CSSProperties = {
        width: addUnit(props.width),
        height: addUnit(props.height),
      }

      if (isDef(props.radius)) {
        style.overflow = 'hidden'
        style.borderRadius = addUnit(props.radius)
      }

      return style
    })

    watch(
      () => props.src,
      () => {
        error.value = false
        loading.value = true
      },
    )

    const onLoad = (event: Event) => {
      if (loading.value) {
        loading.value = false
        emit('load', event)
      }
    }

    const triggerLoad = () => {
      const loadEvent = new Event('load')
      Object.defineProperty(loadEvent, 'target', {
        value: imageRef.value,
        enumerable: true,
      })
      onLoad(loadEvent)
    }

    const onError = (event?: Event) => {
      error.value = true
      loading.value = false
      emit('error', event)
    }

    const renderIcon = (name: string, className: unknown, slot?: Slot) => {
      if (slot) {
        return slot()
      }
      return (
        <Icon
          name={name}
          size={props.iconSize}
          class={className}
          classPrefix={props.iconPrefix}
        />
      )
    }

    const renderPlaceholder = () => {
      if (loading.value && props.showLoading) {
        return (
          <View class={bem('loading')}>
            {renderIcon(props.loadingIcon, bem('loading-icon'), slots.loading)}
          </View>
        )
      }
      if (error.value && props.showError) {
        return (
          <View class={bem('error')}>
            {renderIcon(props.errorIcon, bem('error-icon'), slots.error)}
          </View>
        )
      }
    }

    const renderImage = () => {
      if (error.value || !props.src) {
        return
      }

      const attrs = {
        alt: props.alt,
        class: bem('img'),
        mode: props.fit,
        crossorigin: props.crossorigin,
        referrerpolicy: props.referrerpolicy,
      }

      if (props.lazyLoad) {
        return <image ref={imageRef} v-lazy={props.src} {...attrs} />
      }

      return (
        <image
          ref={imageRef}
          src={props.src}
          onLoad={onLoad}
          onError={onError}
          {...attrs}
        />
      )
    }

    // TODO
    const onLazyLoaded = ({ el }: { el: HTMLElement }) => {
      const check = () => {
        if (el === imageRef.value && loading.value) {
          triggerLoad()
        }
      }
      if (imageRef.value) {
        check()
      } else {
        nextTick(check)
      }
    }

    const onLazyLoadError = ({ el }: { el: HTMLElement }) => {
      if (el === imageRef.value && !error.value) {
        onError()
      }
    }

    if ($Lazyload && inBrowser) {
      $Lazyload.$on('loaded', onLazyLoaded)
      $Lazyload.$on('error', onLazyLoadError)

      onBeforeUnmount(() => {
        $Lazyload.$off('loaded', onLazyLoaded)
        $Lazyload.$off('error', onLazyLoadError)
      })
    }

    onMounted(() => {
      nextTick(() => {
        if (imageRef.value?.complete && !props.lazyLoad) {
          triggerLoad()
        }
      })
    })

    return () => (
      <View
        class={bem({ round: props.round, block: props.block })}
        style={style.value}
      >
        {renderImage()}
        {renderPlaceholder()}
        {slots.default?.()}
      </View>
    )
  },
})

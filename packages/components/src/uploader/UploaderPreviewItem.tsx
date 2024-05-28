import { type PropType, defineComponent } from 'vue'

// Utils
import type { CommonEventFunction } from '@tarojs/components'
import { View } from '@tarojs/components'
import {
  type Interceptor,
  type Numeric,
  callInterceptor,
  extend,
  getSizeStyle,
  isDef,
  makeRequiredProp,
  numericProp,
} from '../utils'

// Components
import { VanIcon } from '../icon'
import type { ImageFit } from '../image'
import { VanImage } from '../image'
import { VanLoading } from '../loading'
import { bem, isImageFile, t } from './utils'

// Types
import type { UploaderFileListItem } from './types'

export default defineComponent({
  props: {
    name: numericProp,
    item: makeRequiredProp<PropType<UploaderFileListItem>>(Object),
    index: Number,
    imageFit: String as PropType<ImageFit>,
    lazyLoad: Boolean,
    deletable: Boolean,
    reupload: Boolean,
    previewSize: [Number, String, Array] as PropType<
      Numeric | [Numeric, Numeric]
    >,
    beforeDelete: Function as PropType<Interceptor>,
  },

  emits: ['delete', 'preview', 'reupload'],

  setup(props, { emit, slots }) {
    const renderMask = () => {
      const { status, message } = props.item

      if (status === 'uploading' || status === 'failed') {
        const MaskIcon
          = status === 'failed'
            ? (
            <VanIcon name="close" class={bem('mask-icon')} />
              )
            : (
            <VanLoading class={bem('loading')} />
              )

        const showMessage = isDef(message) && message !== ''

        return (
          <View class={bem('mask')}>
            {MaskIcon}
            {showMessage && <View class={bem('mask-message')}>{message}</View>}
          </View>
        )
      }
    }

    const onDelete: CommonEventFunction = (event) => {
      const { name, item, index, beforeDelete } = props
      event.stopPropagation()
      callInterceptor(beforeDelete, {
        args: [item, { name, index }],
        done: () => emit('delete'),
      })
    }

    const onPreview = () => emit('preview')

    const onReupload = () => emit('reupload')

    const renderDeleteIcon = () => {
      if (props.deletable && props.item.status !== 'uploading') {
        const slot = slots['preview-delete']
        return (
          <View
            role="button"
            class={bem('preview-delete', { shadow: !slot })}
            tabindex={0}
            aria-label={t('delete')}
            onTap={onDelete}
          >
            {slot
              ? (
                  slot()
                )
              : (
              <VanIcon name="cross" class={bem('preview-delete-icon')} />
                )}
          </View>
        )
      }
    }

    const renderCover = () => {
      if (slots['preview-cover']) {
        const { index, item } = props
        return (
          <View class={bem('preview-cover')}>
            {slots['preview-cover'](extend({ index }, item))}
          </View>
        )
      }
    }

    const renderPreview = () => {
      const { item, lazyLoad, imageFit, previewSize, reupload } = props

      if (isImageFile(item)) {
        return (
          <VanImage
            v-slots={{ default: renderCover }}
            fit={imageFit}
            src={item.objectUrl || item.content || item.url}
            class={bem('preview-image')}
            width={Array.isArray(previewSize) ? previewSize[0] : previewSize}
            height={Array.isArray(previewSize) ? previewSize[1] : previewSize}
            lazyLoad={lazyLoad}
            onClick={reupload ? onReupload : onPreview}
          />
        )
      }

      return (
        <View class={bem('file')} style={getSizeStyle(props.previewSize)}>
          <VanIcon class={bem('file-icon')} name="description" />
          <View class={[bem('file-name'), 'van-ellipsis']}>
            {item.file ? item.file.name : item.url}
          </View>
          {renderCover()}
        </View>
      )
    }

    return () => (
      <View class={bem('preview')}>
        {renderPreview()}
        {renderMask()}
        {renderDeleteIcon()}
      </View>
    )
  },
})

import {
  type ExtractPropTypes,
  type PropType,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  reactive,
  ref,
} from 'vue'
import './index.less'

// Utils
import type { CommonEventFunction } from '@tarojs/components'
import { Input, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useCustomFieldValue } from '../vant-use'
import {
  extend,
  getSizeStyle,
  isPromise,
  makeArrayProp,
  makeNumericProp,
  makeStringProp,
  pick,
  toArray,
  truthProp,
} from '../utils'
import type {
  ComponentInstance,
  Interceptor,
  Numeric,
} from '../utils'

// Composables
import { useExpose } from '../composables/use-expose'

// Components
import { VanIcon } from '../icon'
import { type ImagePreviewOptions, showImagePreview } from '../image-preview'
import type { ImageFit } from '../image'
import UploaderPreviewItem from './UploaderPreviewItem'

// Types
import {
  bem,
  filterFiles,
  isImageFile,
  isOversize,
  name,
  readFileContent,
} from './utils'
import type {
  UploaderAfterRead,
  UploaderBeforeRead,
  UploaderExpose,
  UploaderFileListItem,
  UploaderMaxSize,
  UploaderResultType,
} from './types'

export const uploaderProps = {
  name: makeNumericProp(''),
  accept: makeStringProp('image/*'),
  capture: String,
  multiple: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  lazyLoad: Boolean,
  maxCount: makeNumericProp(Number.POSITIVE_INFINITY),
  imageFit: makeStringProp<ImageFit>('cover'),
  resultType: makeStringProp<UploaderResultType>('dataUrl'),
  uploadIcon: makeStringProp('photograph'),
  uploadText: String,
  deletable: truthProp,
  reupload: Boolean,
  afterRead: Function as PropType<UploaderAfterRead>,
  showUpload: truthProp,
  modelValue: makeArrayProp<UploaderFileListItem>(),
  beforeRead: Function as PropType<UploaderBeforeRead>,
  beforeDelete: Function as PropType<Interceptor>,
  previewSize: [Number, String, Array] as PropType<
    Numeric | [Numeric, Numeric]
  >,
  previewImage: truthProp,
  previewOptions: Object as PropType<Partial<ImagePreviewOptions>>,
  previewFullImage: truthProp,
  maxSize: {
    type: [Number, String, Function] as PropType<UploaderMaxSize>,
    default: Number.POSITIVE_INFINITY,
  },
}

export type UploaderProps = ExtractPropTypes<typeof uploaderProps>

type File = Taro.chooseMedia.ChooseMedia

export default defineComponent({
  name,

  props: uploaderProps,

  emits: [
    'delete',
    'oversize',
    'clickUpload',
    'closePreview',
    'clickPreview',
    'clickReupload',
    'update:modelValue',
  ],

  setup(props, { emit, slots }) {
    const inputRef = ref()
    const urls: string[] = []
    const reuploadIndex = ref(-1)
    const isReuploading = ref(false)

    const getDetail = (index = props.modelValue.length) => ({
      name: props.name,
      index,
    })

    const resetInput = () => {
      if (inputRef.value)
        inputRef.value.value = ''
    }

    const onAfterRead = (
      items: UploaderFileListItem | UploaderFileListItem[],
    ) => {
      resetInput()

      if (isOversize(items, props.maxSize)) {
        if (Array.isArray(items)) {
          const result = filterFiles(items, props.maxSize)
          items = result.valid
          emit('oversize', result.invalid, getDetail())

          if (!items.length)
            return
        }
        else {
          emit('oversize', items, getDetail())
          return
        }
      }
      items = reactive(items)
      if (reuploadIndex.value > -1) {
        const arr = [...props.modelValue]
        arr.splice(reuploadIndex.value, 1, items as UploaderFileListItem)
        emit('update:modelValue', arr)
        reuploadIndex.value = -1
      }
      else {
        emit('update:modelValue', [...props.modelValue, ...toArray(items)])
      }

      if (props.afterRead)
        props.afterRead(items, getDetail())
    }

    const readFile = (files: File | File[]) => {
      const { maxCount, modelValue, resultType } = props

      if (Array.isArray(files)) {
        const remainCount = +maxCount - modelValue.length

        if (files.length > remainCount)
          files = files.slice(0, remainCount)

        Promise.all(
          files.map(file => readFileContent(file, resultType)),
        ).then((contents) => {
          const fileList = (files as File[]).map((file, index) => {
            const result: UploaderFileListItem = {
              file,
              status: '',
              message: '',
              objectUrl: URL.createObjectURL(file),
            }

            if (contents[index])
              result.content = contents[index] as string

            return result
          })

          onAfterRead(fileList)
        })
      }
      else {
        readFileContent(files, resultType).then((content) => {
          const result: UploaderFileListItem = {
            file: files as File,
            status: '',
            message: '',
            objectUrl: URL.createObjectURL(files as File),
          }

          if (content)
            result.content = content

          onAfterRead(result)
        })
      }
    }

    const onChange = (files: File[]) => {
      if (props.disabled || !files || !files.length)
        return

      const file
        = files.length === 1 ? files[0] : ([].slice.call(files) as File[])

      if (props.beforeRead) {
        const response = props.beforeRead(file, getDetail())

        if (!response) {
          resetInput()
          return
        }

        if (isPromise(response)) {
          response
            .then((data) => {
              if (data)
                readFile(data)
              else
                readFile(file)
            })
            .catch(resetInput)
          return
        }
      }

      readFile(file)
    }

    let imagePreview: ComponentInstance | undefined

    const onClosePreview = () => emit('closePreview')

    const previewImage = (item: UploaderFileListItem) => {
      if (props.previewFullImage) {
        const imageFiles = props.modelValue.filter(isImageFile)
        const images = imageFiles
          .map((item) => {
            if (item.objectUrl && !item.url && item.status !== 'failed') {
              item.url = item.objectUrl
              urls.push(item.url)
            }
            return item.url
          })
          .filter(Boolean) as string[]

        imagePreview = showImagePreview(
          extend(
            {
              images,
              startPosition: imageFiles.indexOf(item),
              onClose: onClosePreview,
            },
            props.previewOptions,
          ),
        )
      }
    }

    const closeImagePreview = () => {
      if (imagePreview)
        imagePreview.close()
    }

    const deleteFile = (item: UploaderFileListItem, index: number) => {
      const fileList = props.modelValue.slice(0)
      fileList.splice(index, 1)

      emit('update:modelValue', fileList)
      emit('delete', item, getDetail(index))
    }

    const chooseFile = () => {
      if (inputRef.value && !props.disabled)
        inputRef.value.click()
    }

    const reuploadImage = (index: number) => {
      isReuploading.value = true
      reuploadIndex.value = index
      nextTick(() => chooseFile())
    }
    const onInputClick = () => {
      if (!isReuploading.value)
        reuploadIndex.value = -1

      isReuploading.value = false
    }

    const renderPreviewItem = (item: UploaderFileListItem, index: number) => {
      const needPickData = [
        'imageFit',
        'deletable',
        'reupload',
        'previewSize',
        'beforeDelete',
      ] as const

      const previewData = extend(
        pick(props, needPickData),
        pick(item, needPickData, true),
      )

      return (
        <UploaderPreviewItem
          v-slots={pick(slots, ['preview-cover', 'preview-delete'])}
          item={item}
          index={index}
          onClick={() =>
            emit(
              props.reupload ? 'clickReupload' : 'clickPreview',
              item,
              getDetail(index),
            )
          }
          onDelete={() => deleteFile(item, index)}
          onPreview={() => previewImage(item)}
          onReupload={() => reuploadImage(index)}
          {...pick(props, ['name', 'lazyLoad'])}
          {...previewData}
        />
      )
    }

    const renderPreviewList = () => {
      if (props.previewImage)
        return props.modelValue.map(renderPreviewItem)
    }

    const onClickUpload: CommonEventFunction = (event) => {
      console.log('evts', event)
      Taro.chooseMedia({
        count: props.maxCount as number,
        success: (res) => {
          console.log('res', res)
        },
      })
      emit('clickUpload', event)
    }

    const renderUpload = () => {
      if (props.modelValue.length >= +props.maxCount && !props.reupload)
        return

      const hideUploader
        = props.modelValue.length >= +props.maxCount && props.reupload

      const _Input = props.readonly
        ? null
        : (
        <Input
          ref={inputRef}
          class={bem('input')}
          disabled={props.disabled}
          onClick={onInputClick}
        />
          )

      if (slots.default) {
        return (
          <View
            v-show={!hideUploader}
            class={bem('input-wrapper')}
            onTap={(event) => { onClickUpload(event) }}
          >
            {slots.default()}
            {_Input}
          </View>
        )
      }

      return (
        <View
          v-show={props.showUpload && !hideUploader}
          class={bem('upload', { readonly: props.readonly })}
          style={getSizeStyle(props.previewSize)}
          onTap={(event) => { onClickUpload(event) }}
        >
          <VanIcon name={props.uploadIcon} class={bem('upload-icon')} />
          {props.uploadText && (
            <Text class={bem('upload-text')}>{props.uploadText}</Text>
          )}
          {_Input}
        </View>
      )
    }

    onBeforeUnmount(() => {
      urls.forEach(url => URL.revokeObjectURL(url))
    })

    useExpose<UploaderExpose>({
      chooseFile,
      closeImagePreview,
    })
    useCustomFieldValue(() => props.modelValue)

    return () => (
      <View class={bem()}>
        <View class={bem('wrapper', { disabled: props.disabled })}>
          {renderPreviewList()}
          {renderUpload()}
        </View>
      </View>
    )
  },
})

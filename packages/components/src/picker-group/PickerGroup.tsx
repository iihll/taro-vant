import {
  Comment,
  type ExtractPropTypes,
  Fragment,
  type InjectionKey,
  type VNode,
  defineComponent,
} from 'vue'
import './index.less'
import { View } from '@tarojs/components'

// Utils
import {
  createNamespace,
  extend,
  flat,
  makeArrayProp,
  makeNumericProp,
  pick,
  truthProp,
} from '../utils'

// Composables
import { useChildren } from '../vant-use'
import { useSyncPropRef } from '../composables/use-sync-prop-ref'

// Components
import { VanTab } from '../tab'
import { VanTabs } from '../tabs'
import Toolbar, {
  pickerToolbarProps,
  pickerToolbarSlots,
} from '../picker/PickerToolbar'

const [name, bem] = createNamespace('picker-group')

export type PickerGroupProvide = Record<string, string>

export const PICKER_GROUP_KEY: InjectionKey<PickerGroupProvide> = Symbol(name)

export const pickerGroupProps = extend(
  {
    tabs: makeArrayProp<string>(),
    activeTab: makeNumericProp(0),
    nextStepText: String,
    showToolbar: truthProp,
  },
  pickerToolbarProps,
)

export type PickerGroupProps = ExtractPropTypes<typeof pickerGroupProps>

export default defineComponent({
  name,

  props: pickerGroupProps,

  emits: ['confirm', 'cancel', 'update:activeTab'],

  setup(props, { emit, slots }) {
    const activeTab = useSyncPropRef(
      () => props.activeTab,
      value => emit('update:activeTab', value),
    )
    const { children, linkChildren } = useChildren(PICKER_GROUP_KEY)

    linkChildren()

    const showNextButton = () =>
      +activeTab.value < props.tabs.length - 1 && props.nextStepText

    const onConfirm = () => {
      if (showNextButton()) {
        activeTab.value = +activeTab.value + 1
      }
      else {
        emit(
          'confirm',
          children.map(item => item.confirm()),
        )
      }
    }

    const onCancel = () => emit('cancel')

    return () => {
      let childNodes = slots
        .default?.()
        ?.filter(node => node.type !== Comment)
        .map((node) => {
          if (node.type === Fragment)
            return node.children as VNode[]

          return node
        })

      if (childNodes)
        childNodes = flat(childNodes)

      const confirmButtonText = showNextButton()
        ? props.nextStepText
        : props.confirmButtonText

      return (
        <View class={bem()}>
          {props.showToolbar
            ? (
            <Toolbar
              v-slots={pick(slots, pickerToolbarSlots)}
              title={props.title}
              cancelButtonText={props.cancelButtonText}
              confirmButtonText={confirmButtonText}
              onConfirm={onConfirm}
              onCancel={onCancel}
            />
              )
            : null}
          <VanTabs
            v-model:active={activeTab.value}
            class={bem('tabs')}
            shrink
            animated
            lazyRender={false}
          >
            {props.tabs.map((title, index) => (
              <VanTab title={title} titleClass={bem('tab-title')}>
                {childNodes?.[index]}
              </VanTab>
            ))}
          </VanTabs>
        </View>
      )
    }
  },
})

import {
  ref,
  computed,
  defineComponent,
  onMounted,
} from 'vue'
import './index.less'

// Utils
import { cellSharedProps } from '../cell/Cell'
import {
  pick,
  createNamespace,
} from '../utils'
import { COLLAPSE_KEY } from '../collapse/Collapse'

// Composables
import { useParent, useTaroRect } from '../vant-use'
import { useExpose } from '../composables/use-expose'

// Components
import { View } from '@tarojs/components'
import { Cell } from '../cell'
import { collapseItemProps } from './types'

const [name, bem] = createNamespace('collapse-item')

const CELL_SLOTS = ['icon', 'title', 'value', 'label', 'right-icon'] as const



export default defineComponent({
  name,

  props: collapseItemProps,

  setup(props, { slots }) {
    const { parent, index } = useParent(COLLAPSE_KEY)

    if (!parent) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          '[Vant] <CollapseItem> must be a child component of <Collapse>.',
        )
      }
      return
    }

    const name = computed(() => props.name ?? index.value)
    const expanded = computed(() => parent.isExpanded(name.value))

    const wrapperClassName = bem('wrapper')
    const contentClassName = bem('content')
    const wrapperHeight = ref(0)

    onMounted(() => {
      useTaroRect(`.${contentClassName}`).then((res) => {

        if (!res)
          return

        if (!Array.isArray(res))
          wrapperHeight.value = res.height as number
        console.log(wrapperHeight.value, 'wrapperHeight.value')
      })
    })

    const toggle = (newValue = !expanded.value) => {
      parent.toggle(name.value, newValue)
    }

    const onClickTitle = () => {
      if (!props.disabled && !props.readonly) {
        toggle()
      }
    }

    const renderTitle = () => {
      const { border, disabled, readonly } = props
      const attrs = pick(
        props,
        Object.keys(cellSharedProps) as Array<keyof typeof cellSharedProps>,
      )

      if (readonly) {
        attrs.isLink = false
      }
      if (disabled || readonly) {
        attrs.clickable = false
      }

      return (
        <Cell
          v-slots={pick(slots, CELL_SLOTS)}
          role="button"
          class={bem('title', {
            disabled,
            expanded: expanded.value,
            borderless: !border,
          })}
          aria-expanded={String(expanded.value)}
          onClick={onClickTitle}
          {...attrs}
        />
      )
    }

    const renderContent = () => (
      <View
        class={wrapperClassName}
        style={{ height: `${expanded.value ? wrapperHeight.value : 0}px` }}
      >
        <View class={contentClassName}>
          {slots.default?.()}
        </View>
      </View>
    )

    useExpose({ toggle, expanded, itemName: name })

    return () => (
      <View
        class={[bem({ border: index.value && props.border })]}
        onTouchstart={onClickTitle}
      >
        {renderTitle()}
        {renderContent()}
      </View>
    )
  },
})

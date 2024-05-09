import {
  type CSSProperties,
  type ExtractPropTypes,
  type PropType,
  defineComponent,
} from 'vue'
import { Text, View } from '@tarojs/components'

// Utils
import {
  createNamespace,
  extend,
  isDef,
  makeStringProp,
  numericProp,
  truthProp,
  unknownProp,
} from '../utils'
import './index.less'

// Composables
import { routeProps, useRoute } from '../composables/use-route'

// Components
import { Icon } from '../icon'

const [name, bem] = createNamespace('cell')

export type CellSize = 'normal' | 'large'

export type CellArrowDirection = 'up' | 'down' | 'left' | 'right'

export const cellSharedProps = {
  tag: makeStringProp<keyof HTMLElementTagNameMap>('div'),
  icon: String,
  size: String as PropType<CellSize>,
  title: numericProp,
  value: numericProp,
  label: numericProp,
  center: Boolean,
  isLink: Boolean,
  border: truthProp,
  iconPrefix: String,
  valueClass: unknownProp,
  labelClass: unknownProp,
  titleClass: unknownProp,
  titleStyle: null as unknown as PropType<CSSProperties>,
  arrowDirection: String as PropType<CellArrowDirection>,
  required: {
    type: [Boolean, String] as PropType<boolean | 'auto'>,
    default: null,
  },
  clickable: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
}

export const cellProps = extend({}, cellSharedProps, routeProps)

export type CellProps = ExtractPropTypes<typeof cellProps>

export default defineComponent({
  name,

  props: cellProps,

  setup(props, { slots }) {
    const route = useRoute()

    const renderLabel = () => {
      const showLabel = slots.label || isDef(props.label)

      if (showLabel) {
        return (
          <View class={[bem('label'), props.labelClass]}>
            {slots.label ? slots.label() : props.label}
          </View>
        )
      }
    }

    const renderTitle = () => {
      if (slots.title || isDef(props.title)) {
        const titleSlot = slots.title?.()

        // Allow Field to dynamically set empty label
        // https://github.com/youzan/vant/issues/11368
        if (Array.isArray(titleSlot) && titleSlot.length === 0)
          return

        return (
          <View
            class={[bem('title'), props.titleClass]}
            style={props.titleStyle}
          >
            {titleSlot || <Text>{props.title}</Text>}
            {renderLabel()}
          </View>
        )
      }
    }

    const renderValue = () => {
      // slots.default is an alias of slots.value
      const slot = slots.value || slots.default
      const hasValue = slot || isDef(props.value)

      if (hasValue) {
        return (
          <View class={[bem('value'), props.valueClass]}>
            {slot ? slot() : <Text>{props.value}</Text>}
          </View>
        )
      }
    }

    const renderLeftIcon = () => {
      if (slots.icon)
        return slots.icon()

      if (props.icon) {
        return (
          <Icon
            name={props.icon}
            class={bem('left-icon')}
            classPrefix={props.iconPrefix}
          />
        )
      }
    }

    const renderRightIcon = () => {
      if (slots['right-icon'])
        return slots['right-icon']()

      if (props.isLink) {
        const name
          = props.arrowDirection && props.arrowDirection !== 'right'
            ? `arrow-${props.arrowDirection}`
            : 'arrow'
        return <Icon name={name} class={bem('right-icon')} />
      }
    }

    return () => {
      const { size, center, border, isLink, required } = props
      const clickable = props.clickable ?? isLink

      const classes: Record<string, boolean | undefined> = {
        center,
        required: !!required,
        clickable,
        borderless: !border,
      }
      if (size)
        classes[size] = !!size

      return (
        <View
          class={bem(classes)}
          role={clickable ? 'button' : undefined}
          tabindex={clickable ? 0 : undefined}
          onClick={route}
        >
          {renderLeftIcon()}
          {renderTitle()}
          {renderValue()}
          {renderRightIcon()}
          {slots.extra?.()}
        </View>
      )
    }
  },
})

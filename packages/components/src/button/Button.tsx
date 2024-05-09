import {
  defineComponent,
} from 'vue'
import type {
  CSSProperties,
  ExtractPropTypes,
  PropType,
} from 'vue'

// Utils
import type { CommonEventFunction, ButtonProps as TaroButtonProps } from '@tarojs/components'
import { Button, Text, View } from '@tarojs/components'
import {
  BORDER_SURROUND,
  createNamespace,
  extend,
  makeStringProp,
  numericProp,
  preventDefault,
} from '../utils'
import './index.less'

// Components
import { Icon } from '../icon'

import type { LoadingType } from '../loading'
import { Loading } from '../loading'

// Types
import type {
  ButtonIconPosition,
  ButtonSize,
  ButtonType,
} from './types'

const [name, bem] = createNamespace('button')

export const buttonProps = extend({}, {
  text: String,
  icon: String,
  type: makeStringProp<ButtonType>('default'),
  size: makeStringProp<ButtonSize>('normal'),
  color: String,
  block: Boolean,
  plain: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  hairline: Boolean,
  disabled: Boolean,
  iconPrefix: String,
  loadingSize: numericProp,
  loadingText: String,
  loadingType: String as PropType<LoadingType>,
  iconPosition: makeStringProp<ButtonIconPosition>('left'),
  formType: makeStringProp<keyof TaroButtonProps.FormType>('submit'),
})

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export default defineComponent({
  name,

  props: buttonProps,

  emits: ['click'],

  setup(props, { emit, slots }) {
    // const route = useRoute();

    const renderLoadingIcon = () => {
      if (slots.loading)
        return slots.loading()

      return (
        <Loading
          size={props.loadingSize}
          type={props.loadingType}
          class={bem('loading')}
        />
      )
    }

    const renderIcon = () => {
      if (props.loading)
        return renderLoadingIcon()

      if (slots.icon)
        return <View class={bem('icon')}>{slots.icon()}</View>

      if (props.icon) {
        return (
          <Icon
            name={props.icon}
            class={bem('icon')}
            classPrefix={props.iconPrefix}
          />
        )
      }
    }

    const renderText = () => {
      let text
      if (props.loading)
        text = props.loadingText
      else
        text = slots.default ? slots.default() : props.text

      if (text)
        return <Text class={bem('text')}>{text}</Text>
    }

    const getStyle = () => {
      const { color, plain } = props
      if (color) {
        const style: CSSProperties = {
          color: plain ? color : 'white',
        }

        if (!plain) {
          // Use background instead of backgroundColor to make linear-gradient work
          style.background = color
        }

        // hide border when color is linear-gradient
        if (color.includes('gradient'))
          style.border = 0
        else
          style.borderColor = color

        return style
      }
    }

    const onClick: CommonEventFunction = (event) => {
      if (props.loading)
        preventDefault(event)
      else if (!props.disabled)
        emit('click', event)
        // route();
    }

    return () => {
      const {
        type,
        size,
        block,
        round,
        plain,
        square,
        loading,
        disabled,
        hairline,
        iconPosition,
        formType,
      } = props

      const classes = [
        bem([
          type,
          size,
          {
            plain,
            block,
            round,
            square,
            loading,
            disabled,
            hairline,
          },
        ]),
        { [BORDER_SURROUND]: hairline },
      ]

      return (
        <Button
          class={classes}
          style={getStyle()}
          disabled={disabled}
          onTap={onClick}
          formType={formType}
        >
          <View class={bem('content')}>
            {iconPosition === 'left' && renderIcon()}
            {renderText()}
            {iconPosition === 'right' && renderIcon()}
          </View>
        </Button>
      )
    }
  },
})

import {
  defineComponent,
} from 'vue'
import { View } from '@tarojs/components'
import './index.less'

// Utils
import {
  BORDER_RIGHT,
  BORDER_BOTTOM,
  createNamespace,
} from '../utils'

// Composables
import { useSyncPropRef } from '../composables/use-sync-prop-ref'

// Components
import { Icon } from '../icon'

// Types
import {
  PopoverAction,
  popoverProps
} from './types'

const [name, bem] = createNamespace('popover')

export default defineComponent({
  name,
  props: popoverProps,
  emits: ['select', 'touchstart', 'update:show'],

  setup(props, { emit, slots }) {

    const show = useSyncPropRef(
      () => props.show,
      (value) => emit('update:show', value),
    )

    const onClickWrapper = () => {
      if (props.trigger === 'click') {
        show.value = !show.value
      }
    }

    const onClickAction = (action: PopoverAction, index: number) => {
      if (action.disabled) {
        return
      }

      emit('select', action, index)

      if (props.closeOnClickAction) {
        show.value = false
      }
    }

    // const onClickAway = () => {
    //   if (
    //     show.value &&
    //     props.closeOnClickOutside &&
    //     (!props.overlay || props.closeOnClickOverlay)
    //   ) {
    //     show.value = false
    //   }
    // }

    const renderActionContent = (action: PopoverAction, index: number) => {
      if (slots.action) {
        return slots.action({ action, index })
      }

      return [
        action.icon && (
          <Icon
            name={action.icon}
            classPrefix={props.iconPrefix}
            class={bem('action-icon')}
          />
        ),
        <View
          class={[
            bem('action-text'),
            { [BORDER_BOTTOM]: props.actionsDirection === 'vertical' },
          ]}
        >
          {action.text}
        </View>,
      ]
    }

    const renderAction = (action: PopoverAction, index: number) => {
      const { icon, color, disabled, className } = action
      return (
        <View
          role="menuitem"
          class={[
            bem('action', { disabled, 'with-icon': icon }),
            { [BORDER_RIGHT]: props.actionsDirection === 'horizontal' },
            className,
          ]}
          style={{ color }}
          tabindex={disabled ? undefined : 0}
          aria-disabled={disabled || undefined}
          onClick={() => onClickAction(action, index)}
        >
          {renderActionContent(action, index)}
        </View>
      )
    }

    return () => (
      <>
        <View class={bem('wrapper')} onTouchstart={onClickWrapper}>
          {slots.reference?.()}
          {
            show.value && <View
              className={bem([props.theme, props.placement])}
            >
              {props.showArrow && <View class={bem('arrow')} />}
              <View role="menu" class={bem('content', props.actionsDirection)}>
                {slots.default ? slots.default() : props.actions.map(renderAction)}
              </View>
            </View>
          }
        </View>
      </>
    )
  },
})

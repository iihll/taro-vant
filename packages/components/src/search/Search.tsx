import { type ExtractPropTypes, defineComponent, ref } from 'vue'
import './index.less'
import { View } from '@tarojs/components'

// Utils
import {
  createNamespace,
  extend,
  makeStringProp,
  pick,
  truthProp,
} from '../utils'
import { fieldSharedProps } from '../field/Field'

// Composables
import { useId } from '../composables/use-id'
import { useExpose } from '../composables/use-expose'

// Components
import type { FieldInstance } from '../field'
import { VanField } from '../field'

// Types
import type { SearchShape } from './types'

const [name, bem, t] = createNamespace('search')

export const searchProps = extend({}, fieldSharedProps, {
  label: String,
  shape: makeStringProp<SearchShape>('square'),
  leftIcon: makeStringProp('search'),
  clearable: truthProp,
  actionText: String,
  background: String,
  showAction: Boolean,
})

export type SearchProps = ExtractPropTypes<typeof searchProps>

export default defineComponent({
  name,

  props: searchProps,

  emits: [
    'blur',
    'focus',
    'clear',
    'search',
    'cancel',
    'clickInput',
    'clickLeftIcon',
    'clickRightIcon',
    'update:modelValue',
  ],

  setup(props, { emit, slots, attrs }) {
    const id = useId()
    const fieldRef = ref<FieldInstance>()

    const onCancel = () => {
      if (!slots.action) {
        emit('update:modelValue', '')
        emit('cancel')
      }
    }

    const getInputId = () => props.id || `${id}-input`

    const renderLabel = () => {
      if (slots.label || props.label) {
        return (
          <label class={bem('label')} for={getInputId()}>
            {slots.label ? slots.label() : props.label}
          </label>
        )
      }
    }

    const renderAction = () => {
      if (props.showAction) {
        const text = props.actionText || t('cancel')
        return (
          <View
            class={bem('action')}
            role="button"
            tabindex={0}
            onClick={onCancel}
          >
            {slots.action ? slots.action() : text}
          </View>
        )
      }
    }

    const blur = () => fieldRef.value?.blur()
    const focus = () => fieldRef.value?.focus()
    const onBlur = (event: Event) => emit('blur', event)
    const onFocus = (event: Event) => emit('focus', event)
    const onClear = (event: MouseEvent) => emit('clear', event)
    const onClickInput = (event: MouseEvent) => emit('clickInput', event)
    const onClickLeftIcon = (event: MouseEvent) => emit('clickLeftIcon', event)
    const onClickRightIcon = (event: MouseEvent) =>
      emit('clickRightIcon', event)

    const fieldPropNames = Object.keys(fieldSharedProps) as Array<
      keyof typeof fieldSharedProps
    >

    const renderField = () => {
      const fieldAttrs = extend({}, attrs, pick(props, fieldPropNames), {
        id: getInputId(),
      })

      const onInput = (value: string) => emit('update:modelValue', value)

      return (
        <VanField
          v-slots={pick(slots, ['left-icon', 'right-icon'])}
          ref={fieldRef}
          type="search"
          class={bem('field', { 'with-message': fieldAttrs.errorMessage })}
          border={false}
          onBlur={onBlur}
          onFocus={onFocus}
          onClear={onClear}
          onClickInput={onClickInput}
          onClickLeftIcon={onClickLeftIcon}
          onClickRightIcon={onClickRightIcon}
          onUpdate:modelValue={onInput}
          {...fieldAttrs}
        />
      )
    }

    useExpose({ focus, blur })

    return () => (
      <View
        class={bem({ 'show-action': props.showAction })}
        style={{ background: props.background }}
      >
        {slots.left?.()}
        <View class={bem('content', props.shape)}>
          {renderLabel()}
          {renderField()}
        </View>
        {renderAction()}
      </View>
    )
  },
})

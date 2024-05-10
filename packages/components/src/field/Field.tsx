import {
  type ExtractPropTypes,
  type PropType,
  computed,
  defineComponent,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  watch,
} from 'vue'
import type { CommonEventFunction, ITouchEvent, InputProps } from '@tarojs/components'
import { Input, Label, Textarea, View } from '@tarojs/components'
import './index.less'

// Utils
import {
  CUSTOM_FIELD_INJECTION_KEY,
  useParent,
} from '../vant-use'
import { cellSharedProps } from '../cell/Cell'

// Composables
import {
  type ComponentInstance,
  FORM_KEY,
  addUnit,
  createNamespace,
  extend,
  formatNumber,
  isDef,
  makeNumericProp,
  makeStringProp,
  numericProp,
  preventDefault,
  resetScroll,
  toArray,
  unknownProp,
} from '../utils'
import { useId } from '../composables/use-id'
import { useExpose } from '../composables/use-expose'

// Components
import { VanIcon } from '../icon'
import { VanCell as Cell } from '../cell'
import {
  cutString,
  endComposing,
  getRuleMessage,
  getStringLength,
  isEmptyValue,
  resizeTextarea,
  runRuleValidator,
  runSyncRule,
  startComposing,
} from './utils'

// Types
import type {
  FieldAutosizeConfig,
  FieldClearTrigger,
  FieldExpose,
  FieldFormSharedProps,
  FieldFormatTrigger,
  FieldRule,
  FieldTextAlign,
  FieldType,
  FieldValidateError,
  FieldValidateTrigger,
  FieldValidationStatus,
} from './types'

const [name, bem] = createNamespace('field')

// provide to Search component to inherit
export const fieldSharedProps = {
  id: String,
  name: String,
  leftIcon: String,
  rightIcon: String,
  autofocus: Boolean,
  clearable: Boolean,
  maxlength: numericProp,
  formatter: Function as PropType<(value: string) => string>,
  clearIcon: makeStringProp('clear'),
  modelValue: makeNumericProp(''),
  inputAlign: String as PropType<FieldTextAlign>,
  placeholder: String,
  autocomplete: String,
  autocapitalize: String,
  autocorrect: String,
  errorMessage: String,
  enterkeyhint: String,
  clearTrigger: makeStringProp<FieldClearTrigger>('focus'),
  formatTrigger: makeStringProp<FieldFormatTrigger>('onChange'),
  spellcheck: {
    type: Boolean,
    default: null,
  },
  error: {
    type: Boolean,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: null,
  },
  readonly: {
    type: Boolean,
    default: null,
  },
}

export const fieldProps = extend({}, cellSharedProps, fieldSharedProps, {
  rows: numericProp,
  type: makeStringProp<FieldType>('text'),
  rules: Array as PropType<FieldRule[]>,
  autosize: [Boolean, Object] as PropType<boolean | FieldAutosizeConfig>,
  labelWidth: numericProp,
  labelClass: unknownProp,
  labelAlign: String as PropType<FieldTextAlign>,
  showWordLimit: Boolean,
  errorMessageAlign: String as PropType<FieldTextAlign>,
  colon: {
    type: Boolean,
    default: null,
  },
})

export type FieldProps = ExtractPropTypes<typeof fieldProps>

export default defineComponent({
  name,

  props: fieldProps,

  emits: [
    'blur',
    'focus',
    'clear',
    'keypress',
    'clickInput',
    'endValidate',
    'startValidate',
    'clickLeftIcon',
    'clickRightIcon',
    'update:modelValue',
  ],

  setup(props, { emit, slots }) {
    const id = useId()
    const state = reactive({
      status: 'unvalidated' as FieldValidationStatus,
      focused: false,
      validateMessage: '',
    })

    const inputRef = ref<HTMLInputElement>()
    const clearIconRef = ref<ComponentInstance>()
    const customValue = ref<() => unknown>()

    const { parent: form } = useParent(FORM_KEY)

    const getModelValue = () => String(props.modelValue ?? '')

    const getProp = <T extends FieldFormSharedProps>(key: T) => {
      if (isDef(props[key]))
        return props[key]

      if (form && isDef(form.props[key]))
        return form.props[key]
    }

    const showClear = computed(() => {
      const readonly = getProp('readonly')

      if (props.clearable && !readonly) {
        const hasValue = getModelValue() !== ''
        const trigger
          = props.clearTrigger === 'always'
          || (props.clearTrigger === 'focus' && state.focused)

        return hasValue && trigger
      }
      return false
    })

    const formValue = computed(() => {
      if (customValue.value && slots.input)
        return customValue.value()

      return props.modelValue
    })

    const showRequiredMark = computed(() => {
      const required = getProp('required')
      if (required === 'auto')
        return props.rules?.some((rule: FieldRule) => rule.required)

      return required
    })

    const runRules = (rules: FieldRule[]) =>
      rules.reduce(
        (promise, rule) =>
          promise.then(() => {
            if (state.status === 'failed')
              return

            let { value } = formValue

            if (rule.formatter)
              value = rule.formatter(value, rule)

            if (!runSyncRule(value, rule)) {
              state.status = 'failed'
              state.validateMessage = getRuleMessage(value, rule)
              return
            }

            if (rule.validator) {
              if (isEmptyValue(value) && rule.validateEmpty === false)
                return

              return runRuleValidator(value, rule).then((result) => {
                if (result && typeof result === 'string') {
                  state.status = 'failed'
                  state.validateMessage = result
                }
                else if (result === false) {
                  state.status = 'failed'
                  state.validateMessage = getRuleMessage(value, rule)
                }
              })
            }
          }),
        Promise.resolve(),
      )

    const resetValidation = () => {
      state.status = 'unvalidated'
      state.validateMessage = ''
    }

    const endValidate = () =>
      emit('endValidate', {
        status: state.status,
        message: state.validateMessage,
      })

    const validate = (rules = props.rules) =>
      new Promise<FieldValidateError | void>((resolve) => {
        resetValidation()
        if (rules) {
          emit('startValidate')
          runRules(rules).then(() => {
            if (state.status === 'failed') {
              resolve({
                name: props.name,
                message: state.validateMessage,
              })
              endValidate()
            }
            else {
              state.status = 'passed'
              resolve()
              endValidate()
            }
          })
        }
        else {
          resolve()
        }
      })

    const validateWithTrigger = (trigger: FieldValidateTrigger) => {
      if (form && props.rules) {
        const { validateTrigger } = form.props
        const defaultTrigger = toArray(validateTrigger).includes(trigger)
        const rules = props.rules.filter((rule) => {
          if (rule.trigger)
            return toArray(rule.trigger).includes(trigger)

          return defaultTrigger
        })

        if (rules.length)
          validate(rules)
      }
    }

    // native maxlength have incorrect line-break counting
    // see: https://github.com/vant-ui/vant/issues/5033
    const limitValueLength = (value: string) => {
      const { maxlength } = props
      if (isDef(maxlength) && getStringLength(value) > +maxlength) {
        const modelValue = getModelValue()
        if (modelValue && getStringLength(modelValue) === +maxlength)
          return modelValue

        // Remove redundant interpolated values,
        // make it consistent with the native input maxlength behavior.
        const selectionEnd = inputRef.value?.selectionEnd
        if (state.focused && selectionEnd) {
          const valueArr = [...value]
          const exceededLength = valueArr.length - +maxlength
          valueArr.splice(selectionEnd - exceededLength, exceededLength)
          return valueArr.join('')
        }
        return cutString(value, +maxlength)
      }
      return value
    }

    const updateValue = (
      value: string,
      trigger: FieldFormatTrigger = 'onChange',
    ) => {
      const originalValue = value
      value = limitValueLength(value)
      // When the value length exceeds maxlength,
      // record the excess length for correcting the cursor position.
      // https://github.com/youzan/vant/issues/11289
      const limitDiffLen
        = getStringLength(originalValue) - getStringLength(value)

      if (props.type === 'number' || props.type === 'digit') {
        const isNumber = props.type === 'number'
        value = formatNumber(value, isNumber, isNumber)
      }

      let formatterDiffLen = 0
      if (props.formatter && trigger === props.formatTrigger) {
        const { formatter, maxlength } = props
        value = formatter(value)
        // The length of the formatted value may exceed maxlength.
        if (isDef(maxlength) && getStringLength(value) > +maxlength)
          value = cutString(value, +maxlength)

        if (inputRef.value && state.focused) {
          const { selectionEnd } = inputRef.value
          // The value before the cursor of the original value.
          const bcoVal = cutString(originalValue, selectionEnd!)
          // Record the length change of `bcoVal` after formatting,
          // which is used to correct the cursor position.
          formatterDiffLen
            = getStringLength(formatter(bcoVal)) - getStringLength(bcoVal)
        }
      }

      if (inputRef.value && inputRef.value.value !== value) {
        // When the input is focused, correct the cursor position.
        if (state.focused) {
          let { selectionStart, selectionEnd } = inputRef.value
          inputRef.value.value = value

          if (isDef(selectionStart) && isDef(selectionEnd)) {
            const valueLen = getStringLength(value)

            if (limitDiffLen) {
              selectionStart -= limitDiffLen
              selectionEnd -= limitDiffLen
            }
            else if (formatterDiffLen) {
              selectionStart += formatterDiffLen
              selectionEnd += formatterDiffLen
            }

            inputRef.value.setSelectionRange(
              Math.min(selectionStart, valueLen),
              Math.min(selectionEnd, valueLen),
            )
          }
        }
        else {
          inputRef.value.value = value
        }
      }

      if (value !== props.modelValue)
        emit('update:modelValue', value)
    }

    const onInput: CommonEventFunction<InputProps.inputEventDetail> = (event) => {
      updateValue(event.detail.value)
    }

    const blur = () => inputRef.value?.blur()
    const focus = () => inputRef.value?.focus()

    const adjustTextareaSize = () => {
      const input = inputRef.value
      if (props.type === 'textarea' && props.autosize && input)
        resizeTextarea(input, props.autosize)
    }

    const onFocus: CommonEventFunction<InputProps.inputForceEventDetail> = (event) => {
      state.focused = true
      emit('focus', event)
      nextTick(adjustTextareaSize)
    }

    const onBlur: CommonEventFunction<InputProps.inputValueEventDetail> = (event) => {
      state.focused = false
      updateValue(getModelValue(), 'onBlur')
      emit('blur', event)

      if (getProp('readonly'))
        return

      validateWithTrigger('onBlur')
      nextTick(adjustTextareaSize)
      resetScroll()
    }

    const onClickInput = (event: ITouchEvent) => emit('clickInput', event)

    const onClickLeftIcon = (event: ITouchEvent) => emit('clickLeftIcon', event)

    const onClickRightIcon = (event: ITouchEvent) =>
      emit('clickRightIcon', event)

    const onClear = (event: ITouchEvent) => {
      preventDefault(event)
      emit('update:modelValue', '')
      emit('clear', event)
    }

    const showError = computed(() => {
      if (typeof props.error === 'boolean')
        return props.error

      if (form && form.props.showError && state.status === 'failed')
        return true

      return false
    })

    const labelStyle = computed(() => {
      const labelWidth = getProp('labelWidth')
      const labelAlign = getProp('labelAlign')
      if (labelWidth && labelAlign !== 'top')
        return { width: addUnit(labelWidth) }

      return {}
    })

    // const onKeypress = (event) => {
    //   const ENTER_CODE = 13

    //   if (event.keyCode === ENTER_CODE) {
    //     const submitOnEnter = form && form.props.submitOnEnter
    //     if (!submitOnEnter && props.type !== 'textarea')
    //       preventDefault(event)

    //     // trigger blur after click keyboard search button
    //     if (props.type === 'search')
    //       blur()
    //   }

    //   emit('keypress', event)
    // }

    const getInputId = () => props.id || `${id}-input`

    const getValidationStatus = () => state.status

    const renderInput = () => {
      const controlClass = bem('control', [
        getProp('inputAlign'),
        {
          'error': showError.value,
          'custom': !!slots.input,
          'min-height': props.type === 'textarea' && !props.autosize,
        },
      ])

      if (slots.input) {
        return (
          <View class={controlClass} onClick={onClickInput}>
            {slots.input()}
          </View>
        )
      }

      const inputAttrs = {
        'id': getInputId(),
        'ref': inputRef,
        'name': props.name,
        'rows': props.rows !== undefined ? +props.rows : undefined,
        'class': controlClass,
        'disabled': getProp('disabled'),
        'readonly': getProp('readonly'),
        'autofocus': props.autofocus,
        'placeholder': props.placeholder,
        'autocomplete': props.autocomplete,
        'autocapitalize': props.autocapitalize,
        'autocorrect': props.autocorrect,
        'enterkeyhint': props.enterkeyhint,
        'spellcheck': props.spellcheck,
        'aria-labelledby': props.label ? `${id}-label` : undefined,
        onBlur,
        onFocus,
        onInput,
        'onClick': onClickInput,
        'onChange': endComposing,
        // onKeypress,
        'onCompositionend': endComposing,
        'onCompositionstart': startComposing,
      }

      if (props.type === 'textarea')
        return <Textarea {...inputAttrs} />

      return <Input {...inputAttrs} type={props.type as keyof InputProps.Type} />
    }

    const renderLeftIcon = () => {
      const leftIconSlot = slots['left-icon']

      if (props.leftIcon || leftIconSlot) {
        return (
          <View class={bem('left-icon')} onClick={onClickLeftIcon}>
            {leftIconSlot
              ? (
                leftIconSlot()
              )
              : (
                <VanIcon name={props.leftIcon} classPrefix={props.iconPrefix} />
              )}
          </View>
        )
      }
    }

    const renderRightIcon = () => {
      const rightIconSlot = slots['right-icon']

      if (props.rightIcon || rightIconSlot) {
        return (
          <View class={bem('right-icon')} onClick={onClickRightIcon}>
            {rightIconSlot
              ? (
                rightIconSlot()
              )
              : (
                <VanIcon name={props.rightIcon} classPrefix={props.iconPrefix} />
              )}
          </View>
        )
      }
    }

    const renderWordLimit = () => {
      if (props.showWordLimit && props.maxlength) {
        const count = getStringLength(getModelValue())
        return (
          <View class={bem('word-limit')}>
            <span class={bem('word-num')}>{count}</span>/{props.maxlength}
          </View>
        )
      }
    }

    const renderMessage = () => {
      if (form && form.props.showErrorMessage === false)
        return

      const message = props.errorMessage || state.validateMessage

      if (message) {
        const slot = slots['error-message']
        const errorMessageAlign = getProp('errorMessageAlign')
        return (
          <View class={bem('error-message', errorMessageAlign)}>
            {slot ? slot({ message }) : message}
          </View>
        )
      }
    }

    const renderLabel = () => {
      const labelWidth = getProp('labelWidth')
      const labelAlign = getProp('labelAlign')
      const colon = getProp('colon') ? ':' : ''

      if (slots.label)
        return [slots.label(), colon]

      if (props.label) {
        return (
          <Label
            id={`${id}-label`}
            for={slots.input ? undefined : getInputId()}
            onClick={(event) => {
              // https://github.com/youzan/vant/issues/11831
              preventDefault(event)
              focus()
            }}
            style={
              labelAlign === 'top' && labelWidth
                ? { width: addUnit(labelWidth) }
                : undefined
            }
          >
            {props.label + colon}
          </Label>
        )
      }
    }

    const renderFieldBody = () => [
      <View class={bem('body')}>
        {renderInput()}
        {showClear.value && (
          <VanIcon
            ref={clearIconRef}
            name={props.clearIcon}
            class={bem('clear')}
          />
        )}
        {renderRightIcon()}
        {slots.button && <View class={bem('button')}>{slots.button()}</View>}
      </View>,
      renderWordLimit(),
      renderMessage(),
    ]

    useExpose<FieldExpose>({
      blur,
      focus,
      validate,
      formValue,
      resetValidation,
      getValidationStatus,
    })

    provide(CUSTOM_FIELD_INJECTION_KEY, {
      customValue,
      resetValidation,
      validateWithTrigger,
    })

    watch(
      () => props.modelValue,
      () => {
        updateValue(getModelValue())
        resetValidation()
        validateWithTrigger('onChange')
        nextTick(adjustTextareaSize)
      },
    )

    onMounted(() => {
      updateValue(getModelValue(), props.formatTrigger)
      nextTick(adjustTextareaSize)
    })

    // useEventListener will set passive to `false` to eliminate the warning of Chrome
    // useEventListener('touchstart', onClear, {
    //   target: computed(() => clearIconRef.value?.$el),
    // })

    return () => {
      const disabled = getProp('disabled')
      const labelAlign = getProp('labelAlign')
      const LeftIcon = renderLeftIcon()

      const renderTitle = () => {
        const Label = renderLabel()
        if (labelAlign === 'top')
          return [LeftIcon, Label].filter(Boolean)

        return Label || []
      }

      return (
        <Cell
          v-slots={{
            icon: LeftIcon && labelAlign !== 'top' ? () => LeftIcon : null,
            title: renderTitle,
            value: renderFieldBody,
            extra: slots.extra,
          }}
          size={props.size}
          class={bem({
            error: showError.value,
            disabled,
            [`label-${labelAlign}`]: labelAlign,
          })}
          center={props.center}
          border={props.border}
          isLink={props.isLink}
          clickable={props.clickable}
          titleStyle={labelStyle.value}
          valueClass={bem('value')}
          titleClass={[
            bem('label', [labelAlign, { required: showRequiredMark.value }]),
            props.labelClass,
          ]}
          arrowDirection={props.arrowDirection}
        />
      )
    }
  },
})

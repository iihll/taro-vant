import {
  type ExtractPropTypes,
  type PropType,
  computed,
  defineComponent,
  nextTick,
  ref,
  watch,
} from 'vue'
import { View } from '@tarojs/components'
import './index.less'

// Utils
import {
  BORDER_UNSET_TOP_BOTTOM,
  type Numeric,
  extend,
  isSameValue,
  makeArrayProp,
  makeNumericProp,
  makeStringProp,
  pick,
  preventDefault,
  truthProp,
  unitToPx,
} from '../utils'
import { useChildren, useParent } from '../vant-use'
import { useExpose } from '../composables/use-expose'
import { VanLoading } from '../loading'
import { PICKER_GROUP_KEY } from '../picker-group/PickerGroup'
import {
  assignDefaultFields,
  bem,
  findOptionByValue,
  formatCascadeColumns,
  getColumnsType,
  getFirstEnabledOption,
  isOptionExist,
  name,
} from './utils'

// Composables

// Components
import Column, { PICKER_KEY } from './PickerColumn'
import Toolbar, {
  pickerToolbarPropKeys,
  pickerToolbarProps,
  pickerToolbarSlots,
} from './PickerToolbar'

// Types
import type {
  PickerColumn,
  PickerExpose,
  PickerFieldNames,
  PickerOption,
  PickerToolbarPosition,
} from './types'

export const pickerSharedProps = extend(
  {
    loading: Boolean,
    readonly: Boolean,
    allowHtml: Boolean,
    optionHeight: makeNumericProp(44),
    showToolbar: truthProp,
    swipeDuration: makeNumericProp(1000),
    visibleOptionNum: makeNumericProp(6),
  },
  pickerToolbarProps,
)

export const pickerProps = extend({}, pickerSharedProps, {
  columns: makeArrayProp<PickerOption | PickerColumn>(),
  modelValue: makeArrayProp<Numeric>(),
  toolbarPosition: makeStringProp<PickerToolbarPosition>('top'),
  columnsFieldNames: Object as PropType<PickerFieldNames>,
})

export type PickerProps = ExtractPropTypes<typeof pickerProps>

export default defineComponent({
  name,

  props: pickerProps,

  emits: [
    'confirm',
    'cancel',
    'change',
    'scrollInto',
    'clickOption',
    'update:modelValue',
  ],

  setup(props, { emit, slots }) {
    const columnsRef = ref<HTMLElement>()
    const selectedValues = ref(props.modelValue.slice(0))

    const { parent } = useParent(PICKER_GROUP_KEY)
    const { children, linkChildren } = useChildren(PICKER_KEY)

    linkChildren()

    const fields = computed(() => assignDefaultFields(props.columnsFieldNames))
    const optionHeight = computed(() => unitToPx(props.optionHeight))
    const columnsType = computed(() =>
      getColumnsType(props.columns, fields.value),
    )

    const currentColumns = computed<PickerColumn[]>(() => {
      const { columns } = props
      switch (columnsType.value) {
        case 'multiple':
          return columns as PickerColumn[]
        case 'cascade':
          return formatCascadeColumns(columns, fields.value, selectedValues)
        default:
          return [columns]
      }
    })

    const hasOptions = computed(() =>
      currentColumns.value.some(options => options.length),
    )

    const selectedOptions = computed(() =>
      currentColumns.value.map((options, index) =>
        findOptionByValue(options, selectedValues.value[index], fields.value),
      ),
    )

    const selectedIndexes = computed(() =>
      currentColumns.value.map((options, index) =>
        options.findIndex(
          option =>
            option[fields.value.value] === selectedValues.value[index],
        ),
      ),
    )

    const setValue = (index: number, value: Numeric) => {
      if (selectedValues.value[index] !== value) {
        const newValues = selectedValues.value.slice(0)
        newValues[index] = value
        selectedValues.value = newValues
      }
    }

    const getEventParams = () => ({
      selectedValues: selectedValues.value.slice(0),
      selectedOptions: selectedOptions.value,
      selectedIndexes: selectedIndexes.value,
    })

    const onChange = (value: Numeric, columnIndex: number) => {
      setValue(columnIndex, value)

      if (columnsType.value === 'cascade') {
        // reset values after cascading
        selectedValues.value.forEach((value, index) => {
          const options = currentColumns.value[index]
          if (!isOptionExist(options, value, fields.value)) {
            setValue(
              index,
              options.length ? options[0][fields.value.value] : undefined,
            )
          }
        })
      }

      nextTick(() => {
        emit('change', extend({ columnIndex }, getEventParams()))
      })
    }

    const onClickOption = (
      currentOption: PickerOption,
      columnIndex: number,
    ) => {
      const params = { columnIndex, currentOption }
      emit('clickOption', extend(getEventParams(), params))
      emit('scrollInto', params)
    }

    const confirm = () => {
      children.forEach(child => child.stopMomentum())
      const params = getEventParams()

      // wait nextTick to ensure the model value is update to date
      // when confirm event is emitted
      nextTick(() => {
        emit('confirm', params)
      })

      return params
    }

    const cancel = () => emit('cancel', getEventParams())

    const renderColumnItems = () =>
      currentColumns.value.map((options, columnIndex) => (
        <Column
          v-slots={{ option: slots.option }}
          value={selectedValues.value[columnIndex]}
          fields={fields.value}
          options={options}
          readonly={props.readonly}
          allowHtml={props.allowHtml}
          optionHeight={optionHeight.value}
          swipeDuration={props.swipeDuration}
          visibleOptionNum={props.visibleOptionNum}
          onChange={(value: Numeric) => onChange(value, columnIndex)}
          onClickOption={(option: PickerOption) =>
            onClickOption(option, columnIndex)
          }
          onScrollInto={(option: PickerOption) => {
            emit('scrollInto', {
              currentOption: option,
              columnIndex,
            })
          }}
        />
      ))

    const renderMask = (wrapHeight: number) => {
      if (hasOptions.value) {
        const frameStyle = { height: `${optionHeight.value}px` }
        const maskStyle = {
          backgroundSize: `100% ${(wrapHeight - optionHeight.value) / 2}px`,
        }
        return [
          <View class={bem('mask')} style={maskStyle} />,
          <View
            class={[BORDER_UNSET_TOP_BOTTOM, bem('frame')]}
            style={frameStyle}
          />,
        ]
      }
    }

    const renderColumns = () => {
      const wrapHeight = optionHeight.value * +props.visibleOptionNum
      const columnsStyle = { height: `${wrapHeight}px` }
      return (
        <View ref={columnsRef} class={bem('columns')} style={columnsStyle} onTouchmove={preventDefault}>
          {renderColumnItems()}
          {renderMask(wrapHeight)}
        </View>
      )
    }

    const renderToolbar = () => {
      if (props.showToolbar && !parent) {
        return (
          <Toolbar
            v-slots={pick(slots, pickerToolbarSlots)}
            {...pick(props, pickerToolbarPropKeys)}
            onConfirm={confirm}
            onCancel={cancel}
          />
        )
      }
    }

    watch(
      currentColumns,
      (columns) => {
        columns.forEach((options, index) => {
          if (
            options.length
            && !isOptionExist(options, selectedValues.value[index], fields.value)
          ) {
            setValue(
              index,
              getFirstEnabledOption(options)![fields.value.value],
            )
          }
        })
      },
      { immediate: true },
    )

    // preserve last emitted model value
    // when props.modelValue is updated by parent component,
    // the new value should be compared with the last emitted value
    let lastEmittedModelValue: Numeric[]
    watch(
      () => props.modelValue,
      (newValues) => {
        if (
          !isSameValue(newValues, selectedValues.value)
          && !isSameValue(newValues, lastEmittedModelValue)
        ) {
          selectedValues.value = newValues.slice(0)
          lastEmittedModelValue = newValues.slice(0)
        }
      },
      { deep: true },
    )
    watch(
      selectedValues,
      (newValues) => {
        if (!isSameValue(newValues, props.modelValue)) {
          lastEmittedModelValue = newValues.slice(0)
          emit('update:modelValue', lastEmittedModelValue)
        }
      },
      { immediate: true },
    )

    const getSelectedOptions = () => selectedOptions.value

    useExpose<PickerExpose>({ confirm, getSelectedOptions })

    return () => (
      <View class={bem()}>
        {props.toolbarPosition === 'top' ? renderToolbar() : null}
        {props.loading ? <VanLoading class={bem('loading')} /> : null}
        {slots['columns-top']?.()}
        {renderColumns()}
        {slots['columns-bottom']?.()}
        {props.toolbarPosition === 'bottom' ? renderToolbar() : null}
      </View>
    )
  },
})

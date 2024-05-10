import { type ExtractPropTypes, type PropType, defineComponent } from 'vue'

// Utils
import { useParent } from '../vant-use'
import { createNamespace, extend, pick } from '../utils'
import { RADIO_KEY } from '../radio-group/RadioGroup'

// Composables

// Components
import Checker, {
  type CheckerLabelPosition,
  type CheckerShape,
  checkerProps,
} from '../checkbox/Checker'

export type RadioShape = CheckerShape | 'dot'

export const radioProps = extend({}, checkerProps, {
  shape: String as PropType<RadioShape>,
})

export type RadioLabelPosition = CheckerLabelPosition
export type RadioProps = ExtractPropTypes<typeof radioProps>

const [name, bem] = createNamespace('radio')

export default defineComponent({
  name,

  props: radioProps,

  emits: ['update:modelValue'],

  setup(props, { emit, slots }) {
    const { parent } = useParent(RADIO_KEY)

    const checked = () => {
      const value = parent ? parent.props.modelValue : props.modelValue
      return value === props.name
    }

    const toggle = () => {
      if (parent)
        parent.updateValue(props.name)
      else
        emit('update:modelValue', props.name)
    }

    return () => (
      <Checker
        v-slots={pick(slots, ['default', 'icon'])}
        bem={bem}
        role="radio"
        parent={parent}
        checked={checked()}
        onToggle={toggle}
        {...props}
      />
    )
  },
})

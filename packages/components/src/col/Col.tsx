import { type ExtractPropTypes, computed, defineComponent } from 'vue'
import { View } from '@tarojs/components'
import {
  createNamespace,
  extend,
  makeNumericProp,
  makeStringProp,
  numericProp,
} from '../utils'
import { useParent } from '../vant-use'
import { ROW_KEY } from '../row/Row'
import './index.less'

const [name, bem] = createNamespace('col')

export const colProps = {
  tag: makeStringProp<keyof HTMLElementTagNameMap>('div'),
  span: makeNumericProp(0),
  offset: numericProp,
}

export type ColProps = ExtractPropTypes<typeof colProps>

export default defineComponent({
  name,

  props: colProps,

  setup(props, { slots }) {
    const { parent, index } = useParent(ROW_KEY)

    const style = computed(() => {
      if (!parent)
        return {}

      const { spaces, verticalSpaces } = parent
      let styles = {}
      if (spaces && spaces.value && spaces.value[index.value]) {
        const { left, right } = spaces.value[index.value]
        styles = {
          paddingLeft: left ? `${left}px` : null,
          paddingRight: right ? `${right}px` : null,
        }
      }

      const { bottom } = verticalSpaces.value[index.value] || {}

      return extend(styles, {
        marginBottom: bottom ? `${bottom}px` : null,
      })
    })

    return () => {
      const { span, offset } = props

      return (
        <View
          style={style.value}
          class={bem({ [span]: span, [`offset-${offset}`]: offset })}
        >
          {slots.default?.()}
        </View>
      )
    }
  },
})

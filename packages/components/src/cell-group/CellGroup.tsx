import { type ExtractPropTypes, defineComponent } from 'vue'
import { View } from '@tarojs/components'
import { BORDER_TOP_BOTTOM, createNamespace, truthProp } from '../utils'
import { useScopeId } from '../composables/use-scope-id'

const [name, bem] = createNamespace('cell-group')

export const cellGroupProps = {
  title: String,
  inset: Boolean,
  border: truthProp,
}

export type CellGroupProps = ExtractPropTypes<typeof cellGroupProps>

export default defineComponent({
  name,

  inheritAttrs: false,

  props: cellGroupProps,

  setup(props, { slots, attrs }) {
    const renderGroup = () => (
      <View
        class={[
          bem({ inset: props.inset }),
          { [BORDER_TOP_BOTTOM]: props.border && !props.inset },
        ]}
        {...attrs}
        {...useScopeId()}
      >
        {slots.default?.()}
      </View>
    )

    const renderTitle = () => (
      <View class={bem('title', { inset: props.inset })}>
        {slots.title ? slots.title() : props.title}
      </View>
    )

    return () => {
      if (props.title || slots.title) {
        return (
          <>
            {renderTitle()}
            {renderGroup()}
          </>
        )
      }

      return renderGroup()
    }
  },
})

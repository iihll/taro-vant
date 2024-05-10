import {
  type ExtractPropTypes,
  type PropType,
  computed,
  defineComponent,
  inject,
} from 'vue'
import { Image } from '@tarojs/components'
import {
  addUnit,
  createNamespace,
  makeStringProp,
  numericProp,
} from '../utils'
import { VanBadge, type BadgeProps } from '../badge'
import { CONFIG_PROVIDER_KEY } from '../config-provider/ConfigProvider'
import './index.less'

const [name, bem] = createNamespace('icon')

const isImage = (name?: string) => name?.includes('/')

export const iconProps = {
  dot: Boolean,
  tag: makeStringProp<keyof HTMLElementTagNameMap>('i'),
  name: String,
  size: numericProp,
  badge: numericProp,
  color: String,
  badgeProps: Object as PropType<Partial<BadgeProps>>,
  classPrefix: String,
}

export type IconProps = ExtractPropTypes<typeof iconProps>

export default defineComponent({
  name,

  props: iconProps,

  emits: ['click'],

  setup(props, { slots, emit }) {
    const config = inject(CONFIG_PROVIDER_KEY, null)

    const classPrefix = computed(
      () => props.classPrefix || config?.iconPrefix || bem(),
    )

    return () => {
      const { tag, dot, name, size, badge, color } = props
      const isImageIcon = isImage(name)

      return (
        <VanBadge
          dot={dot}
          tag={tag}
          class={[
            classPrefix.value,
            isImageIcon ? '' : `${classPrefix.value}-${name}`,
          ]}
          style={{
            color,
            fontSize: addUnit(size),
          }}
          content={badge}
          {...props.badgeProps}
          onClick={() => { emit('click') }}
        >
          {slots.default?.()}
          {isImageIcon && <Image class={bem('image')} src={name!} />}
        </VanBadge>
      )
    }
  },
})

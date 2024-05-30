import { computed, defineComponent } from 'vue'
import { Text, View } from '@tarojs/components'
import { useParent } from '../vant-use'
import { BORDER, createNamespace } from '../utils'
import { STEPS_KEY } from '../steps/Steps'
import { VanIcon } from '../icon'
import './index.less'

const [name, bem] = createNamespace('step')
export default defineComponent({
  name,
  setup(props, { slots }) {
    const { parent, index } = useParent(STEPS_KEY)

    if (!parent) {
      // eslint-disable-next-line n/prefer-global/process
      if (process.env.NODE_ENV !== 'production')
        console.error('[Vant] <Step> must be a child component of <Steps>.')

      return
    }

    const parentProps = parent.props

    const getStatus = () => {
      const active = +parentProps.active
      if (index.value < active)
        return 'finish'

      return index.value === active ? 'process' : 'waiting'
    }

    const isActive = () => getStatus() === 'process'

    const lineStyle = computed(() => ({
      background:
        getStatus() === 'finish'
          ? parentProps.activeColor
          : parentProps.inactiveColor,
    }))

    const titleStyle = computed(() => {
      if (isActive())
        return { color: parentProps.activeColor }

      if (getStatus() === 'waiting')
        return { color: parentProps.inactiveColor }
      return {}
    })

    const onClickStep = () => parent.onClickStep(index.value)

    const renderCircle = () => {
      const { iconPrefix, finishIcon, activeIcon, activeColor, inactiveIcon }
        = parentProps

      if (isActive()) {
        if (slots['active-icon'])
          return slots['active-icon']()

        return (
          <VanIcon
            class={bem('icon', 'active')}
            name={activeIcon}
            color={activeColor}
            size={15}
            classPrefix={iconPrefix}
          />
        )
      }

      if (getStatus() === 'finish' && (finishIcon || slots['finish-icon'])) {
        if (slots['finish-icon'])
          return slots['finish-icon']()

        return (
          <VanIcon
            class={bem('icon', 'finish')}
            name={finishIcon}
            color={activeColor}
            size={15}
            classPrefix={iconPrefix}
          />
        )
      }

      if (slots['inactive-icon'])
        return slots['inactive-icon']()

      if (inactiveIcon) {
        return (
          <VanIcon
            class={bem('icon')}
            name={inactiveIcon}
            size={15}
            classPrefix={iconPrefix}
          />
        )
      }

      return <Text class={bem('circle')} style={lineStyle.value} />
    }

    return () => {
      const status = getStatus()

      return (
        <View
          class={[BORDER, bem([parentProps.direction, { [status]: status }])]}
        >
          <View
            class={bem('title', { active: isActive() })}
            style={titleStyle.value}
            onClick={onClickStep}
          >
            {slots.default?.()}
          </View>
          <View class={bem('circle-container')} onClick={onClickStep}>
            {renderCircle()}
          </View>
          <View class={bem('line')} style={lineStyle.value} />
        </View>
      )
    }
  },
})

import type { Ref } from 'vue'
import { View } from '@tarojs/components'
import type { BEM } from '../utils/create'
import { useHeight } from './use-height'

export function usePlaceholder(contentRef: Ref<Element | undefined>, bem: BEM) {
  const height = useHeight(contentRef, true)

  return (renderContent: () => JSX.IntrinsicElements) => (
    <View
      class={bem('placeholder')}
      style={{ height: height.value ? `${height.value}px` : undefined }}
    >
      {renderContent()}
    </View>
  )
}

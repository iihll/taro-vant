import type { Ref } from 'vue'
import { onBeforeUnmount, onDeactivated } from 'vue'
import { inBrowser } from '../utils'
import { onMountedOrActivated } from '../vant-use'

// @Experimental
export function useVisibilityChange(
  target: Ref<Element | undefined>,
  onChange: (visible: boolean) => void,
) {
  // compatibility: https://caniuse.com/#feat=intersectionobserver
  if (!inBrowser || !window.IntersectionObserver)
    return

  const observer = new IntersectionObserver(
    (entries) => {
      // visibility changed
      onChange(entries[0].intersectionRatio > 0)
    },
    { root: document.body },
  )

  const observe = () => {
    if (target.value)
      observer.observe(target.value)
  }

  const unobserve = () => {
    if (target.value)
      observer.unobserve(target.value)
  }

  onDeactivated(unobserve)
  onBeforeUnmount(unobserve)
  onMountedOrActivated(observe)
}

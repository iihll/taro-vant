import type { InjectionKey, Ref } from 'vue'
import { inject, watch } from 'vue'

export interface CustomFieldInjectionValue {
  customValue: Ref<(() => unknown) | undefined>
  resetValidation: () => void
  validateWithTrigger: (trigger: 'onBlur' | 'onChange' | 'onSubmit') => void
}

export const CUSTOM_FIELD_INJECTION_KEY: InjectionKey<CustomFieldInjectionValue>
  = Symbol('van-field')

export function useCustomFieldValue(customValue: () => unknown) {
  const field = inject(CUSTOM_FIELD_INJECTION_KEY, null)

  if (field && !field.customValue.value) {
    field.customValue.value = customValue

    watch(customValue, () => {
      field.resetValidation()
      field.validateWithTrigger('onChange')
    })
  }
}

import _PickerGroup, { PickerGroupProps } from './PickerGroup';

export const PickerGroup = _PickerGroup
export default PickerGroup;
export { pickerGroupProps } from './PickerGroup';
export type { PickerGroupProps };
export type { PickerGroupThemeVars } from './types';

declare module 'vue' {
  export interface GlobalComponents {
    VanPickerGroup: typeof PickerGroup;
  }
}

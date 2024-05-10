import _Col from './Col'

export const VanCol = _Col
export default VanCol
export { colProps } from './Col'
export type { ColProps } from './Col'

declare module 'vue' {
  export interface GlobalComponents {
    VanCol: typeof VanCol
  }
}

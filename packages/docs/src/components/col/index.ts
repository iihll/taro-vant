import _Col from './Col';

export const Col = _Col
export default Col;
export { colProps } from './Col';
export type { ColProps } from './Col';

declare module 'vue' {
  export interface GlobalComponents {
    VanCol: typeof Col;
  }
}

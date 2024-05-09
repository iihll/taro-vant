import type { ComponentPublicInstance } from 'vue'

export function noop() {}

export const extend = Object.assign

export const inBrowser = typeof window !== 'undefined'

export type Numeric = number | string

// eslint-disable-next-line @typescript-eslint/ban-types
export type ComponentInstance = ComponentPublicInstance<{}, any>

export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object'
}

export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isDate(val: unknown): val is Date {
  return Object.prototype.toString.call(val) === '[object Date]'
  && !Number.isNaN((val as Date).getTime())
}

export function isMobile(value: string): boolean {
  value = value.replace(/[^-|\d]/g, '')
  return (
    /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value)
  )
}

export function isNumeric(val: Numeric): val is string {
  return typeof val === 'number' || /^\d+(\.\d+)?$/.test(val)
}

export function isIOS(): boolean {
  return inBrowser
    ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
    : false
}

export function get(object: any, path: string): any {
  const keys = path.split('.')
  let result = object

  keys.forEach((key) => {
    result = isObject(result) ? result[key] ?? '' : ''
  })

  return result
}

export type Writeable<T> = { -readonly [P in keyof T]: T[P] }

export type RequiredParams<T> = T extends (...args: infer P) => infer R
  ? (...args: { [K in keyof P]-?: NonNullable<P[K]> }) => R
  : never

export function pick<T, U extends keyof T>(
  obj: T,
  keys: ReadonlyArray<U>,
  ignoreUndefined?: boolean,
) {
  return keys.reduce(
    (ret, key) => {
      if (!ignoreUndefined || obj[key] !== undefined)
        ret[key] = obj[key]

      return ret
    },
    {} as Writeable<Pick<T, U>>,
  )
}

export function isSameValue(newValue: unknown, oldValue: unknown) {
  return JSON.stringify(newValue) === JSON.stringify(oldValue)
}

export function toArray<T>(item: T | T[]): T[] {
  return Array.isArray(item) ? item : [item]
}

export function flat<T>(arr: Array<T | T[]>) {
  return arr.reduce<T[]>((acc, val) => acc.concat(val), [])
}

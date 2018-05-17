export { isPlainObject, omit, existy } from '@cotto/utils.ts'

export type Path = string | (string | number)[]

// 参考: https://github.com/debitoor/dot-prop-immutable
export function rec(src: any, path: Path, value: any, idx: number) {
  let clone
  const key = path[idx]

  if (path.length > idx) {
    if (Array.isArray(src)) {
      clone = src.slice()
    } else {
      clone = { ...src }
    }
    clone[key] = rec(clone[key] !== undefined ? clone[key] : {}, path, value, idx + 1)
    return clone
  }
  return (typeof value === 'function') ? value(src) : value
}

export function parsePath(path: Path) {
  return (typeof path === 'string') ? path.split('.') : [...path]
}

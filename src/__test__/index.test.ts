import { getIn, hasIn, setIn, updateIn, delIn, validateIn } from './../index'

const src = () => ({
  obj: { a: 'a', b: 'b' },
  arr: [{ prop: 'a' }, { prop: 'b' }],
})

describe('getIn', () => {
  test('functional src', () => {
    expect(getIn(src, ['obj', 'a'])).toBe('a')
    expect(getIn(src, 'obj.a')).toBe('a')
    expect(getIn(src, 'arr.0.prop')).toBe('a')
    expect(getIn(src, 'obj.c')).toBeUndefined()
  })

  test('object src', () => {
    expect(getIn(src(), ['obj', 'a'])).toBe('a')
  })
})

describe('hasIn', () => {
  test('functional src', () => {
    expect(hasIn(src, ['obj'])).toBe(true)
    expect(hasIn(src, ['obj', 'a'])).toBe(true)
    expect(hasIn(src, 'arr.0.prop')).toBe(true)
    expect(hasIn(src, 'obj.a.b.c.d')).toBe(false)
  })

  test('object src', () => {
    expect(hasIn(src(), ['obj'])).toBe(true)
  })
})

describe('setIn', () => {
  test('functional src', () => {
    const r1 = setIn(src, ['obj', 'a'], 'A')
    const r2 = setIn(src, 'arr.0.prop', 'A')
    expect(r1).toEqual({ ...src(), obj: { a: 'A', b: 'b' } })
    expect(r2).toEqual({ ...src(), arr: [{ prop: 'A' }, { prop: 'b' }] })
  })

  test('object src', () => {
    const srcObj = src()
    const r = setIn(srcObj, ['obj', 'a'], 'A')
    expect(r).toEqual({ ...src(), obj: { a: 'A', b: 'b' } })
    expect(srcObj).not.toEqual(r) // immutable
  })

  test('create node when missing', () => {
    const r = setIn(src, 'obj.c.d', 'D')
    expect(r).toEqual({ ...src(), obj: { ...src().obj, c: { d: 'D' } } })
  })
})

describe('updateIn', () => {
  test('functional src', () => {
    const r1 = updateIn(src, ['obj'], v => ({ ...v, a: 'A' }))
    const r2 = updateIn(src, 'arr.0.prop', () => 'A')
    expect(r1).toEqual({ ...src(), obj: { a: 'A', b: 'b' } })
    expect(r2).toEqual({ ...src(), arr: [{ prop: 'A' }, { prop: 'b' }] })
  })
  test('object src', () => {
    const r1 = updateIn(src(), ['obj'], v => ({ ...v, a: 'A' }))
    expect(r1).toEqual({ ...src(), obj: { a: 'A', b: 'b' } })
  })
})

describe('delIn', () => {
  test('functional src', () => {
    const r = delIn(src, ['obj', 'a'])
    expect(r).toEqual({ ...src(), obj: { b: 'b' } })
  })
  test('object src', () => {
    const r = delIn(src(), 'arr.1')
    expect(r).toEqual({ ...src(), arr: [{ prop: 'a' }] })
  })
})

describe('validateIn', () => {
  test('validate', () => {
    const r1 = validateIn(src, ['obj', 'a'], s => typeof s === 'string')
    const r2 = validateIn(src, ['obj', 'a'], s => s === 'b')
    expect(r1).toBe(true)
    expect(r2).toBe(false)
  })
})

import { getIn, hasIn, setIn, updateIn, delIn } from './../index'

const src = {
  a: { b: 'b', c: { d: 'd' } },
  e: [{ f: 'f' }, { g: 'g' }],
}

describe('getIn', () => {
  test('in object', () => {
    expect(getIn(src, ['a', 'b'])).toBe('b')
    expect(getIn(src, 'a.b')).toBe('b')
  })

  test('in array', () => {
    expect(getIn(src, 'e.1')).toEqual(src.e[1])
    expect(getIn(src, 'e.1.g')).toBe('g')
  })

  test('result is shallow clone', () => {
    expect(getIn(src, 'a')).not.toBe(src.a)
    expect(getIn(src, 'a')).toEqual(src.a)
  })

  test('result is undefined when target missing', () => {
    expect(getIn(src, 'a.b.c')).toBeUndefined()
  })
})

describe('hasIn', () => {
  test('object in', () => {
    expect(hasIn(src, ['a', 'b'])).toBe(true)
    expect(hasIn(src, 'a.b')).toBe(true)
    expect(hasIn(src, 'a.d')).toBe(false)
  })

  test('array in', () => {
    expect(hasIn(src, 'e.1')).toBe(true)
    expect(hasIn(src, 'e.1.g')).toBe(true)
    expect(hasIn(src, 'e.1.f')).toBe(false)
  })
})

describe('setIn', () => {
  test('object in', () => {
    const exp = { b: 'b', c: { d: 'd!' } }
    expect(setIn(src.a, ['c'], { d: 'd!' })).toEqual(exp)
    expect(src.a.c).toEqual({ d: 'd' }) // expect immutabe
  })

  test('array in', () => {
    const exp = [{ f: 'f!' }, { g: 'g' }]
    expect(setIn(src, 'e.0', { f: 'f!' }).e).toEqual(exp)
    expect(src.e[0]).toEqual({ f: 'f' }) // expect immutable
  })

  test('create key when missing', () => {
    const exp = { b: 'b', c: { d: 'd' }, d: { e: { f: 'f' } } }
    expect(setIn(src.a, 'd.e', { f: 'f' })).toEqual(exp)
  })
})

describe('updateIn', () => {
  test('object in', () => {
    const r = updateIn(src, ['a', 'b'], v => v + '!')
    expect(r.a.b).toBe('b!')
    expect(src.a.b).toBe('b')
  })

  test('array in', () => {
    const r = updateIn(src, 'e.0.f', v => v + '!')
    expect(r.e[0]).toEqual({ f: 'f!' })
    expect(src.e[0]).toEqual({ f: 'f' })
  })
})

describe('delIn', () => {
  test('object in', () => {
    const r = delIn(src, ['a', 'c'])
    expect(r.a.c).toBeUndefined()
    expect(src.a.c).not.toBeUndefined()
  })

  test('array in', () => {
    const r = delIn(src, 'e.0')
    const r2 = delIn(src, 'e.0.f')
    expect(r.e).toEqual([{ g: 'g' }])
    expect(src.e).toEqual([{ f: 'f' }, { g: 'g' }])
    expect(r2.e).toEqual([{}, { g: 'g' }])
  })
})


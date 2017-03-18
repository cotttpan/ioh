import * as assert from 'assert';
import * as sinon from 'sinon';
import * as I from './../src/index';

const src = {
    a: 'test',
    b: [{ id: 1 }, { id: 2 }, { id: 3 }],
    c: {
        d: [{ id: 4 }, { id: 5 }, { id: 6 }],
        e: {
            f: 'deep'
        }
    }
};

describe('getIn', () => {
    context('Object', () => {
        it('return props', () => {
            const props = I.getIn(src, ['c', 'e']);
            assert.deepEqual(props, src.c.e);
        });
    });
    context('Array', () => {
        it('return props', () => {
            const props = I.getIn(src, 'b.0');
            assert.deepEqual(props, src.b[0]);
        });
    });
    context('Empty', () => {
        it('return undifine', () => {
            const props = I.getIn(src, 'empty');
            assert.equal(props, undefined);
        });
    });
});


describe('hasIn', () => {
    context('Object', () => {
        it('return props', () => {
            const result = I.hasIn(src, ['c', 'e']);
            assert.deepEqual(result, true);
        });
    });
    context('Array', () => {
        it('return props', () => {
            const result = I.hasIn(src, 'b.0');
            assert.deepEqual(result, true);
        });
    });
    context('Empty', () => {
        it('return undifine', () => {
            const result = I.hasIn(src, 'empty');
            assert.equal(result, false);
        });
    });
});

describe('setIn', () => {
    context('Object', () => {
        it('return new object', () => {
            const obj = { z: 'replace' };
            const props = I.updateIn(src, ['c', 'e'], () => obj);
            assert.deepEqual(src.c.e, { f: 'deep' });
            assert.deepEqual(props.c.e, obj);
        });
    });
    context('Array', () => {
        it('return new object', () => {
            const obj = { id: 6 };
            const result = I.setIn(src, 'b.0', obj);
            assert.deepEqual(src.b[0], { id: 1 });
            assert.deepEqual(result.b[0], obj);
        });
    });
    context('new object', () => {
        it('return new object', () => {
            const obj = { newObj: 'new' };
            const result = I.setIn(src, 'd.x', obj);
            assert(!I.hasIn(src, 'd.x'));
            assert.deepEqual((result as any).d.x, obj);
        });
    });
});

describe('updateIn', () => {
    const obj = { z: 'replace' };
    const spy = sinon.spy(() => obj);
    beforeEach(spy.reset);
    context('Object', () => {
        it('return new object', () => {
            const props = I.setIn(src, ['c', 'e'], spy);
            assert.deepEqual(props.c.e, obj);
            assert(spy.calledWith({
                f: 'deep'
            }));
        });
    });
    context('Array', () => {
        it('return new object', () => {
            const result = I.updateIn(src, 'b.0', spy);
            assert.deepEqual(result.b[0], obj);
        });
    });
    context('new object', () => {
        it('return new object', () => {
            const result = I.updateIn(src, 'd.x', spy);
            assert.deepEqual((result as any).d.x, obj);
        });
    });
});

describe('deleteIn', () => {
    context('Object', () => {
        it('return props', () => {
            const result = I.deleteIn(src, ['c', 'e']);
            assert(!I.hasIn(result, 'c.e'));
        });
    });
    context('Array', () => {
        it('return props', () => {
            const result = I.deleteIn(src, 'b.3');
            assert(!I.hasIn(result, 'b.3'));
        });
    });
    context('Empty', () => {
        it('return undifine', () => {
            const result = I.deleteIn(src, 'empty');
            assert.deepEqual(result, src);
        });
    });
});

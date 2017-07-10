/* tslint:disable:max-line-length */
/* tslint:disable:unified-signatures */
import * as _ from './utils';

export * from './utils';
export {
    getIn,
    hasIn,
    setIn,
    updateIn,
    deleteIn
};

function getIn<O, K1 extends keyof O>(src: O, path: string | K1): O[K1];
function getIn<O, K1 extends keyof O>(src: O, path: string | [K1]): O[K1];
function getIn<O, K1 extends keyof O, K2 extends keyof O[K1]>(src: O, path: string | [K1, K2]): O[K1][K2];
function getIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2]>(src: O, path: string | [K1, K2, K3]): O[K1][K2][K3];
function getIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2], K4 extends keyof O[K1][K2][K3]>(src: O, path: string | [K1, K2, K3, K4]): O[K1][K2][K3][K4];
function getIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2], K4 extends keyof O[K1][K2][K3], K5 extends keyof O[K1][K2][K3][K4]>(src: O, path: string | [K1, K2, K3, K4, K5]): O[K1][K2][K3][K4][K5];
function getIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2], K4 extends keyof O[K1][K2][K3], K5 extends keyof O[K1][K2][K3][K4], K6 extends keyof O[K1][K2][K3][K4][K5]>(src: O, path: string | [K1, K2, K3, K4, K5, K6]): O[K1][K2][K3][K4][K5][K6];
function getIn(src: object, path: string) {
    try {
        const result = _.parsePath(path).reduce((acc, k) => (acc as any)[k], src);
        if (_.isPlainObject(result)) return { ...result };
        if (Array.isArray(result)) return [...result];
        return result;
    } catch (e) {
        return undefined;
    }
}

function hasIn<O, K1 extends keyof O>(src: O, path: string | K1): boolean;
function hasIn<O, K1 extends keyof O>(src: O, path: string | [K1]): boolean;
function hasIn<O, K1 extends keyof O, K2 extends keyof O[K1]>(src: O, path: string | [K1, K2]): boolean;
function hasIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2]>(src: O, path: string | [K1, K2, K3]): boolean;
function hasIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2], K4 extends keyof O[K1][K2][K3]>(src: O, path: string | [K1, K2, K3, K4]): boolean;
function hasIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2], K4 extends keyof O[K1][K2][K3], K5 extends keyof O[K1][K2][K3][K4]>(src: O, path: string | [K1, K2, K3, K4, K5]): boolean;
function hasIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2], K4 extends keyof O[K1][K2][K3], K5 extends keyof O[K1][K2][K3][K4], K6 extends keyof O[K1][K2][K3][K4][K5]>(src: O, path: string | [K1, K2, K3, K4, K5, K6]): boolean;
function hasIn(src: object, path: string) {
    return _.existy(getIn(src, path));
}

function setIn<O, K1 extends keyof O, V>(src: O, path: string | K1, value: V): O & Record<K1, V>;
function setIn<O, K1 extends keyof O, V>(src: O, path: string | [K1], value: V): O & Record<K1, V>;
function setIn<O, K1 extends keyof O, K2 extends keyof O[K1], V>(src: O, path: string | [K1, K2], value: V): O & Record<K1, Record<K2, V>>;
function setIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2], V>(src: O, path: string | [K1, K2, K3], value: V): O & Record<K1, Record<K2, Record<K3, V>>>;
function setIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2], K4 extends keyof O[K1][K2][K3], V>(src: O, path: string | [K1, K2, K3, K4], value: V): O & Record<K1, Record<K2, Record<K3, Record<K4, V>>>>;
function setIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2], K4 extends keyof O[K1][K2][K3], K5 extends keyof O[K1][K2][K3][K4], V>(src: O, path: string | [K1, K2, K3, K4, K5], value: V): O & Record<K1, Record<K2, Record<K3, Record<K4, Record<K5, V>>>>>;
function setIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2], K4 extends keyof O[K1][K2][K3], K5 extends keyof O[K1][K2][K3][K4], K6 extends keyof O[K1][K2][K3][K4][K5], V>(src: O, path: string | [K1, K2, K3, K4, K5, K6], value: V): O & Record<K1, Record<K2, Record<K3, Record<K4, Record<K5, Record<K6, V>>>>>>;
function setIn(src: object, path: string, value: any) {
    return _.rec(src, _.parsePath(path), value, 0);
}

function updateIn<O, K1 extends keyof O, V>(src: O, path: string | [K1], updater: (v: O[K1]) => V): O & Record<K1, V>;
function updateIn<O, K1 extends keyof O, K2 extends keyof O[K1], V>(src: O, path: string | [K1, K2], updater: (v: O[K1][K2]) => V): O & Record<K1, Record<K2, V>>;
function updateIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2], V>(src: O, path: string | [K1, K2, K3], updater: (v: O[K1][K2][K3]) => V): O & Record<K1, Record<K2, Record<K3, V>>>;
function updateIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2], K4 extends keyof O[K1][K2][K3], V>(src: O, path: string | [K1, K2, K3, K4], updater: (v: O[K1][K2][K3][K4]) => V): O & Record<K1, Record<K2, Record<K3, Record<K4, V>>>>;
function updateIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2], K4 extends keyof O[K1][K2][K3], K5 extends keyof O[K1][K2][K3][K4], V>(src: O, path: string | [K1, K2, K3, K4, K5], updater: (v: O[K1][K2][K3][K4][K5]) => V): O & Record<K1, Record<K2, Record<K3, Record<K4, Record<K5, V>>>>>;
function updateIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2], K4 extends keyof O[K1][K2][K3], K5 extends keyof O[K1][K2][K3][K4], K6 extends keyof O[K1][K2][K3][K4][K5], V>(src: O, path: string | [K1, K2, K3, K4, K5, K6], updater: (v: O[K1][K2][K3][K4][K5][K6]) => V): O & Record<K1, Record<K2, Record<K3, Record<K4, Record<K5, Record<K6, V>>>>>>;
function updateIn(src: object, path: string, updater: Function) {
    return _.rec(src, _.parsePath(path), updater, 0);
}

function deleteIn<O, K1 extends keyof O>(src: O, path: string | K1): Partial<O>;
function deleteIn<O, K1 extends keyof O>(src: O, path: string | [K1]): Partial<O>;
function deleteIn<O, K1 extends keyof O, K2 extends keyof O[K1]>(src: O, path: string | [K1, K2]): Partial<O>;
function deleteIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2]>(src: O, path: string | [K1, K2, K3]): Partial<O>;
function deleteIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2], K4 extends keyof O[K1][K2][K3]>(src: O, path: string | [K1, K2, K3, K4]): Partial<O>;
function deleteIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2], K4 extends keyof O[K1][K2][K3], K5 extends keyof O[K1][K2][K3][K4]>(src: O, path: string | [K1, K2, K3, K4, K5]): Partial<O>;
function deleteIn<O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2], K4 extends keyof O[K1][K2][K3], K5 extends keyof O[K1][K2][K3][K4], K6 extends keyof O[K1][K2][K3][K4][K5]>(src: O, path: string | [K1, K2, K3, K4, K5, K6]): Partial<O>;
function deleteIn(src: object, path: string) {
    const _path = _.parsePath(path);
    return updateIn(src, _path.slice(0, -1) as any, (o: any) => {
        const target = _path[_path.length - 1];
        return Array.isArray(o) ? o.filter((_x, i) => i !== Number(target)) : _.omit(o, target);
    });
}

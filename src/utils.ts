export type Path = string | (string | number)[];

export function isPlainObject(obj: object) {
    return obj instanceof Object && Object.getPrototypeOf(obj) === Object.prototype;
}

export function omit(src: any, key: string | number) {
    const clone = { ...src };
    delete clone[key];
    return clone;
}

// 参考: https://github.com/debitoor/dot-prop-immutable
export function rec(src: any, path: Path, value: any, idx: number) {
    let clone;
    let key = path[idx];

    if (path.length > idx) {
        if (Array.isArray(src)) {
            clone = src.slice();
        } else {
            clone = { ...src };
        }
        clone[key] = rec(clone[key] !== undefined ? clone[key] : {}, path, value, idx + 1);
        return clone;
    }
    return (typeof value === 'function') ? value(src) : value;
}

export function parsePath(path: Path) {
    return (typeof path === 'string') ? path.split('.') : [...path];
}

export function existy(v: any) {
    return !(v === null || v === undefined);
}

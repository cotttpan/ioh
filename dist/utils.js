"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPlainObject(obj) {
    return obj instanceof Object && Object.getPrototypeOf(obj) === Object.prototype;
}
exports.isPlainObject = isPlainObject;
;
function omit(src, key) {
    const clone = Object.assign({}, src);
    delete clone[key];
    return clone;
}
exports.omit = omit;
// 参考: https://github.com/debitoor/dot-prop-immutable
function rec(src, path, value, idx) {
    let clone;
    let key = path[idx];
    if (path.length > idx) {
        if (Array.isArray(src)) {
            clone = src.slice();
        }
        else {
            clone = Object.assign({}, src);
        }
        clone[key] = rec(clone[key] !== undefined ? clone[key] : {}, path, value, idx + 1);
        return clone;
    }
    return (typeof value === 'function') ? value(src) : value;
}
exports.rec = rec;
;
function parsePath(path) {
    return (typeof path === 'string') ? path.split('.') : [...path];
}
exports.parsePath = parsePath;
function existy(v) {
    return !(v === null || v === undefined);
}
exports.existy = existy;
//# sourceMappingURL=utils.js.map
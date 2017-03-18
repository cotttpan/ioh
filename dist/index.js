"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("./utils");
function getIn(src, path) {
    try {
        return _.parsePath(path).reduce((acc, k) => acc[k], src);
    }
    catch (e) {
        return undefined;
    }
}
exports.getIn = getIn;
function hasIn(src, path) {
    return _.existy(getIn(src, path));
}
exports.hasIn = hasIn;
function setIn(src, path, value) {
    return _.rec(src, _.parsePath(path), value, 0);
}
exports.setIn = setIn;
function updateIn(src, path, updater) {
    return _.rec(src, _.parsePath(path), updater, 0);
}
exports.updateIn = updateIn;
function deleteIn(src, path) {
    const _path = _.parsePath(path);
    return updateIn(src, _path.slice(0, -1), (o) => {
        const target = _path[_path.length - 1];
        return Array.isArray(o) ? o.filter((_, i) => i !== Number(target)) : _.omit(o, target);
    });
}
exports.deleteIn = deleteIn;
//# sourceMappingURL=index.js.map
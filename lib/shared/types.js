"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = exports.isFunction = exports.isObject = void 0;
function isObject(value) {
    return createTypeInspectorSimpleFactory(value, "Object");
}
exports.isObject = isObject;
function isFunction(value) {
    return createTypeInspectorSimpleFactory(value, "Function");
}
exports.isFunction = isFunction;
function isArray(value) {
    return createTypeInspectorSimpleFactory(value, "Array");
}
exports.isArray = isArray;
function createTypeInspectorSimpleFactory(value, typeOfExpectation) {
    return Object.prototype.toString.call(value) === `[object ${typeOfExpectation}]`;
}
//# sourceMappingURL=types.js.map
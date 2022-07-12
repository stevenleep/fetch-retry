// TODO: 使用简单工厂模式和策略模式改写下方⬇️代码
export function isObject(value) {
    return createTypeInspectorSimpleFactory(value, "Object");
}
export function isFunction(value) {
    return createTypeInspectorSimpleFactory(value, "Function");
}
export function isArray(value) {
    return createTypeInspectorSimpleFactory(value, "Array");
}
export function isString(value) {
    return createTypeInspectorSimpleFactory(value, "String");
}
export function isNumber(value) {
    return createTypeInspectorSimpleFactory(value, "Number");
}
export function isMeaningful(value, meaningfulOptions = {
    allowEmptyNumber: false,
    allowEmptyString: false,
    allowMinus: true,
}) {
    if (isString(value) && isEmptyString(value) && meaningfulOptions.allowEmptyString)
        return true;
    if (isNumber(value) && isEmptyNumber(value) && meaningfulOptions.allowEmptyNumber)
        return true;
    return !!value;
}
export function isEmptyString(value) {
    return value === "";
}
export function isEmptyNumber(value) {
    return value === 0;
}
// isPromise
// ref: https://262.ecma-international.org/6.0/#sec-promise.then
export function isPromise(valueOrPromiseInstance, strict = true) {
    if (!isMeaningful(valueOrPromiseInstance))
        return false;
    const isStringPromise = createTypeInspectorSimpleFactory(valueOrPromiseInstance, "Promise");
    const isThenable = isThenabled(valueOrPromiseInstance);
    return strict && isStringPromise && isThenable;
}
export function isThenabled(valueOrPromiseInstance) {
    return isMeaningful(valueOrPromiseInstance) && isFunction(valueOrPromiseInstance.then);
}
function createTypeInspectorSimpleFactory(value, typeOfExpectation) {
    return Object.prototype.toString.call(value) === `[object ${typeOfExpectation}]`;
}
//# sourceMappingURL=types.js.map
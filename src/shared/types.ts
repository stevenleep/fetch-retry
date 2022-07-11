
export function isObject(value: unknown) {
    return createTypeInspectorSimpleFactory(value, "Object");
}
export function isFunction(value: unknown) {
    return createTypeInspectorSimpleFactory(value, "Function")
}
export function isArray(value: unknown) {
    return createTypeInspectorSimpleFactory(value, "Array");
}

function createTypeInspectorSimpleFactory(value: unknown, typeOfExpectation:string) {
    return Object.prototype.toString.call(value) === `[object ${typeOfExpectation}]`;
}

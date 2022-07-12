// TODO: 使用简单工厂模式和策略模式改写下方⬇️代码
export function isObject(value: any) {
    return createTypeInspectorSimpleFactory(value, "Object");
}
export function isFunction(value: any) {
    return createTypeInspectorSimpleFactory(value, "Function")
}
export function isArray(value: any) {
    return createTypeInspectorSimpleFactory(value, "Array");
}
export function isString(value: any): boolean {
    return createTypeInspectorSimpleFactory(value, "String");
}
export function isNumber(value: any): boolean {
    return createTypeInspectorSimpleFactory(value, "Number");
}


/**
 * isMeaningful
 *
 * @param value: {unknown}
 * @param meaningfulOptions?:
    * @option allowEmptyString?: {boolean}
    * @option allowEmptyNumber?: {boolean}; // 0
    * @option allowMinus?: {boolean}; // -1
    * @option validator?: {(value, meaningfulOptions) => boolean}; // 可用于自定义检验
 * */
export interface MeaningfulOptions {
    allowEmptyString?: boolean;
    allowEmptyNumber?: boolean;
    allowMinus?: boolean;
    validator?: (value: any, meaningfulOptions: MeaningfulOptions) => boolean;
}
export function isMeaningful(value: any, meaningfulOptions: MeaningfulOptions = {
    allowEmptyNumber: false,
    allowEmptyString: false,
    allowMinus: true,
}): boolean {
    if(isString(value) && isEmptyString(value) && meaningfulOptions.allowEmptyString) return true;
    if(isNumber(value) && isEmptyNumber(value) && meaningfulOptions.allowEmptyNumber) return true;

    return !!value;
}


export function isEmptyString(value: any):boolean {
    return value === "";
}
export function isEmptyNumber(value: any):boolean {
    return value === 0;
}

// isPromise
// ref: https://262.ecma-international.org/6.0/#sec-promise.then
export function isPromise(valueOrPromiseInstance: any, strict = true): boolean {
    if(!isMeaningful(valueOrPromiseInstance)) return false;
    const isStringPromise = createTypeInspectorSimpleFactory(valueOrPromiseInstance, "Promise");
    const isThenable = isThenabled(valueOrPromiseInstance);
    return strict && isStringPromise && isThenable;
}

export function isThenabled(valueOrPromiseInstance: any): boolean {
    return isMeaningful(valueOrPromiseInstance) && isFunction(valueOrPromiseInstance.then);
}

function createTypeInspectorSimpleFactory(value: any, typeOfExpectation:string) {
    return Object.prototype.toString.call(value) === `[object ${typeOfExpectation}]`;
}

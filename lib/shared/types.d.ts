export declare function isObject(value: any): boolean;
export declare function isFunction(value: any): boolean;
export declare function isArray(value: any): boolean;
export declare function isString(value: any): boolean;
export declare function isNumber(value: any): boolean;
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
export declare function isMeaningful(value: any, meaningfulOptions?: MeaningfulOptions): boolean;
export declare function isEmptyString(value: any): boolean;
export declare function isEmptyNumber(value: any): boolean;
export declare function isPromise(valueOrPromiseInstance: any, strict?: boolean): boolean;
export declare function isThenabled(valueOrPromiseInstance: any): boolean;
//# sourceMappingURL=types.d.ts.map
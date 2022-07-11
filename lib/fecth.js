"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhanceFetchRetry = void 0;
function enhanceFetchRetry(fetchInstance, retryOptions) {
    function retryFunction(input, init) {
        const { response } = processFetchRetry(fetchInstance(input, init), {
            input,
            init,
            retryOptions,
            count: 0
        });
        return response;
    }
    function processFetchRetry(originalResponse, context) {
        // TODO: 完善Promise<boolean>的情况
        const isRetry = context.retryOptions.condition(originalResponse, context);
        if (isRetry && context.retryOptions.count < context.retryOptions.retries) {
            // TODO: setTimeout 模拟setInterval延迟执行, 实现精准延迟
            setTimeout(() => retryFunction(context.input, context.init), context.retryOptions.delay);
        }
        return {
            isRetry,
            response: originalResponse,
            count: context.count,
        };
    }
    return retryFunction;
}
exports.enhanceFetchRetry = enhanceFetchRetry;
//# sourceMappingURL=fecth.js.map
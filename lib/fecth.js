export function enhanceFetchRetry(fetchInstance, retryOptions) {
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
        var _a, _b;
        // TODO: 完善Promise<boolean>的情况
        const isRetry = (_a = context.retryOptions) === null || _a === void 0 ? void 0 : _a.condition(originalResponse, context);
        if (isRetry && context.count < ((_b = context.retryOptions) === null || _b === void 0 ? void 0 : _b.retries)) {
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
//# sourceMappingURL=fecth.js.map
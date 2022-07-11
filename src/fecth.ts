import {CreateRetryOptions} from "./index";

export type FetchFunction = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export function enhanceFetchRetry(fetchInstance: FetchFunction, retryOptions?: CreateRetryOptions): FetchFunction {
    function retryFunction(input: RequestInfo|URL, init?: RequestInit): Promise<Response> {
        const { response } = processFetchRetry(fetchInstance(input, init), {
            input,
            init,
            retryOptions,
            count: 0
        });
        return response;
    }

    function processFetchRetry(originalResponse: Promise<Response>, context: { input: RequestInfo | URL; init?: RequestInit | undefined; retryOptions: any; count: number; }) {
       // TODO: 完善Promise<boolean>的情况
        const isRetry = context.retryOptions.condition(originalResponse, context);
        if(isRetry && context.retryOptions.count < context.retryOptions.retries) {
            // TODO: setTimeout 模拟setInterval延迟执行, 实现精准延迟
           setTimeout(() => retryFunction(context.input, context.init), context.retryOptions.delay);
        }
        return {
            isRetry,
            response: originalResponse,
            count: context.count,
        };
    }

    return retryFunction
}

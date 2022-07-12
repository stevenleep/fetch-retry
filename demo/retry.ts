import interceptors from "./Interceptors";
import defaultPreset from "./presets/default";

export interface CreateRetryOptions {
    enabled?: boolean;
    retries?: number;
    factor?: (response, data, context) => Promise<boolean>;
    delay?: number;
    count?: number;
    validate?: (
        response?: Response,
        previousResponse?: Response,
        request?: Request,
        originalOptions?: CreateRetryOptions,
    ) => boolean;
}

type DefineFetchFunction = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
function prepare(options, preset): CreateRetryOptions {
    return { ...preset, ...options }
}

export function createRetry(fetchInstance: DefineFetchFunction, options?: CreateRetryOptions): DefineFetchFunction {
    const op = prepare(options, defaultPreset);
    function retryFunction(input: RequestInfo | URL, init?: RequestInit & CreateRetryOptions): Promise<Response> {
        const response = fetchInstance(input, init);

        const context = { input, init, retryOptions: op };
        interceptors.interceptor.response.run(response, response, context);

        return new Promise((resolve, reject) => {
            processFetchRetry(response, context).then(res => {
                if (!res.condition) {
                    resolve(res.response);
                }
            });
        })
    };

    async function processFetchRetry(response: Promise<Response>, context: {
        input: RequestInfo | URL,
        retryOptions: CreateRetryOptions,
        init?: RequestInit,
    }) {
        const data = await response;
        const isContinue = await context.retryOptions?.factor?.(response, data, context);
        const condition = context.retryOptions.enabled && context.retryOptions.count! < context.retryOptions.retries! && isContinue;
        if (condition) {
            context.retryOptions.count!++;
            setTimeout(() => {
                processFetchRetry(fetchInstance(context.input, context.init), context);
            }, context.retryOptions.delay!);
        };
        return { response, isContinue, context, condition };
    };

    return retryFunction;
}

interceptors.interceptor.response.use(async (response, data, context) => {
    console.log("-----", context);
});
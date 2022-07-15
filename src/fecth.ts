import { CreateRetryOptions } from "./index";
import { isPromise } from "./shared"

export type Fetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export function enhanceFetchRetry(fetchInstance: Fetch, retryOptions: CreateRetryOptions): Fetch {
    return function (input: RequestInfo | URL, init?: RequestInit) {
        return new Promise<Response>((resolve, reject) => {
            processFetchRetry(fetchInstance, retryOptions, {
                input: input,
                init: init || {},
                onRetrySuccess: resolve,
                onRetryReject: reject,
                count: 0
            });
        });
    };
};

export interface ProcessRetryContext {
    input: RequestInfo | URL;
    init: RequestInit;
    onRetrySuccess: (promiseResponse: Promise<Response>, response: Response) => void;
    onRetryReject: (promiseResponse: Promise<Response>, response: Response, error: Error) => void;
    count: number;
}

async function processFetchRetry(originalFetchInstance: Fetch, retryOptions: CreateRetryOptions, context: ProcessRetryContext) {
    const promiseResponse = originalFetchInstance(context.input, context.init);
    const response = await promiseResponse;
    const { condition, retriesAvailable, isContinue } = await getRetryStatus(
        promiseResponse,
        response,
        retryOptions,
        context
    );
    // 返回是继续重试, 但是不存在重试的次数
    if (condition && !retriesAvailable) {
        context.onRetryReject(promiseResponse, response, new Error("Retry count exceeded"));
        return;
    }

    if (isContinue) {
        context.count++;
        setTimeout(() => {
            processFetchRetry(originalFetchInstance, retryOptions, context);
        }, retryOptions.delay);
    } else {
        context.onRetrySuccess(promiseResponse, response);
        context.count = 0
        return;
    }
}

async function getRetryStatus(
    promiseResponse: Promise<Response>,
    response: Response,
    retryOptions: CreateRetryOptions,
    context: ProcessRetryContext
) {
    const conditionWrapperResult = retryOptions.condition(
        promiseResponse,
        response,
        context.count,
        context,
        retryOptions
    );
    const conditionResult = isPromise(conditionWrapperResult) ? await conditionWrapperResult : conditionWrapperResult;
    // 还具备重试的次数
    const retriesAvailable = retryOptions.retries > context.count;
    return {
        condition: conditionResult,
        retriesAvailable,
        isContinue: retriesAvailable && conditionResult
    };
}
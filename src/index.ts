import type { Fetch, ProcessRetryContext } from "./fecth";
import { enhanceFetchRetry } from "./fecth";
import { isFunction } from "./shared";

export interface CreateRetryOptions {
    enable?: boolean;
    retries: number; // 重试的次数
    condition: (promiseResponse: Promise<Response>, response: Response, count: number, context: ProcessRetryContext, option?: CreateRetryOptions) => boolean | Promise<boolean>, // 全局重试的条件
    delay: number, // 多久重试一次, 单位毫秒(ms)
    onRetry?: () => any; // 当重试发生后
    plugins?: []
}

function createRetry(clientHttpInstance: Fetch, retryOptions: CreateRetryOptions): Fetch {
    // TODO: 临时测试(认为Function为Fetch);
    const isFetch = isFunction(clientHttpInstance);
    if (isFetch) {
        return enhanceFetchRetry(clientHttpInstance, retryOptions);
    }
    return clientHttpInstance;
}

export default createRetry;
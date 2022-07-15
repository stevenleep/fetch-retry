import type { Fetch, ProcessRetryContext } from "./fecth";
export interface CreateRetryOptions {
    enable?: boolean;
    retries: number;
    condition: (promiseResponse: Promise<Response>, response: Response, count: number, context: ProcessRetryContext, option?: CreateRetryOptions) => boolean | Promise<boolean>;
    delay: number;
    onRetry?: () => any;
    plugins?: [];
}
declare function createRetry(clientHttpInstance: Fetch, retryOptions: CreateRetryOptions): Fetch;
export default createRetry;
//# sourceMappingURL=index.d.ts.map
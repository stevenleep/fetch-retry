import type { FetchFunction } from "./fecth";
export interface CreateRetryOptions {
    enable?: boolean;
    retries: number;
    condition(originalResponse: Promise<Response>, context: {
        input: RequestInfo | URL;
        init?: RequestInit | undefined;
        retryOptions: any;
        count: number;
    }): boolean | Promise<boolean>;
    delay: number;
    onRetry?: () => any;
    plugins?: [];
}
declare function createRetry(clientHttpInstance: FetchFunction, retryOptions: CreateRetryOptions): FetchFunction;
export default createRetry;
//# sourceMappingURL=index.d.ts.map
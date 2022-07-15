import { CreateRetryOptions } from "./index";
export declare type Fetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
export declare function enhanceFetchRetry(fetchInstance: Fetch, retryOptions: CreateRetryOptions): Fetch;
export interface ProcessRetryContext {
    input: RequestInfo | URL;
    init: RequestInit;
    onRetrySuccess: (promiseResponse: Promise<Response>, response: Response) => void;
    onRetryReject: (promiseResponse: Promise<Response>, response: Response, error: Error) => void;
    count: number;
}
//# sourceMappingURL=fecth.d.ts.map
import { CreateRetryOptions } from "./index";
export declare type FetchFunction = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
export declare function enhanceFetchRetry(fetchInstance: FetchFunction, retryOptions?: CreateRetryOptions): FetchFunction;
//# sourceMappingURL=fecth.d.ts.map
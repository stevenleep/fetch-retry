import createRetry from "http-retries";

const retryfetch = createRetry(fetch, {
    delay: 1000,
    condition(originalResponse: Promise<Response>, context: { input: RequestInfo | URL; init?: RequestInit | undefined; retryOptions: any; count: number }): boolean | Promise<boolean> {
        return context.input.toString().includes("/api");
    },
    retries: 4
});

retryfetch("/api/c").then(res => {
    console.log(res)
});
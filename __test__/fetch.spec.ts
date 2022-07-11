import createRetry from "../src";

const fetchRetry = createRetry(fetch, {
    delay: 0,
    retries: 3,
    condition: (response: Promise<Response>, context: { input: RequestInfo | URL; init?: RequestInit | undefined; retryOptions: any; count: number; }) =>{
       // @ts-ignore
        return new Promise( async resolve => {
            const data = await response;
            const retryCondition = data.status >= 400 && context.input.toString().includes("/api/safe");
            resolve(retryCondition);
        })
    }
});

fetchRetry("https://www.baidu.com/api/safe", {
    headers: {},
}).then(response => {
    console.log(response)
})

import { createRetry } from "./retry";

let count = 0;

const retryFetch = createRetry(fetch, {
    // enabled: true,
    delay: 3000,
    retries: 10,
    factor: async function (response, data, context) {
        const json = await response;
        if (count >= 2) {
            context.input = "https://httpbin.org/get";
        }
        count++;
        console.log("sdbshjdblksjhbdhjsk", response, context);
        return json.status >= 400;
    },
});

retryFetch("https://httpbin.org/gets", {}).then(res => {
    console.log("[[[ data OKOKOK ]]]", res);
})

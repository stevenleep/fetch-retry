import createRetry from "../src";
import {FetchFunction} from "../lib/fecth";
import {isFunction} from "../lib/shared";
import {isPromise} from "../src/shared";

const fetch:FetchFunction = (req , init): Promise<Response> => {
    return new Promise(resolve => {
      resolve({ status:400 } as Response);
    })
}

describe('createRetry', function () {
    it('should run', function () {
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
        expect(isFunction(fetchRetry)).toBe(true);
        // expect(isPromise(fetchRetry)).toBe(true);
        console.log(isPromise(fetchRetry));
    });
});

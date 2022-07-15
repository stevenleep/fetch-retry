var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isPromise } from "./shared";
export function enhanceFetchRetry(fetchInstance, retryOptions) {
    return function (input, init) {
        return new Promise((resolve, reject) => {
            processFetchRetry(fetchInstance, retryOptions, {
                input: input,
                init: init || {},
                onRetrySuccess: resolve,
                onRetryReject: reject,
                count: 0
            });
        });
    };
}
;
function processFetchRetry(originalFetchInstance, retryOptions, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const promiseResponse = originalFetchInstance(context.input, context.init);
        const response = yield promiseResponse;
        const { condition, retriesAvailable, isContinue } = yield getRetryStatus(promiseResponse, response, retryOptions, context);
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
        }
        else {
            context.onRetrySuccess(promiseResponse, response);
            context.count = 0;
            return;
        }
    });
}
function getRetryStatus(promiseResponse, response, retryOptions, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const conditionWrapperResult = retryOptions.condition(promiseResponse, response, context.count, context, retryOptions);
        const conditionResult = isPromise(conditionWrapperResult) ? yield conditionWrapperResult : conditionWrapperResult;
        // 还具备重试的次数
        const retriesAvailable = retryOptions.retries > context.count;
        return {
            condition: conditionResult,
            retriesAvailable,
            isContinue: retriesAvailable && conditionResult
        };
    });
}
//# sourceMappingURL=fecth.js.map
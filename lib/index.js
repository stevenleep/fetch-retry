import { enhanceFetchRetry } from "./fecth";
import { isFunction } from "./shared";
function createRetry(clientHttpInstance, retryOptions) {
    // TODO: 临时测试(认为Function为Fetch);
    const isFetch = isFunction(clientHttpInstance);
    if (isFetch) {
        return enhanceFetchRetry(clientHttpInstance, retryOptions);
    }
    return clientHttpInstance;
}
export default createRetry;
//# sourceMappingURL=index.js.map
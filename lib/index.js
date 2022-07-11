"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fecth_1 = require("./fecth");
const shared_1 = require("./shared");
function createRetry(clientHttpInstance, retryOptions) {
    // TODO: 临时测试(认为Function为Fetch);
    const isFetch = (0, shared_1.isFunction)(clientHttpInstance);
    if (isFetch) {
        return (0, fecth_1.enhanceFetchRetry)(clientHttpInstance, retryOptions);
    }
    return clientHttpInstance;
}
exports.default = createRetry;
//# sourceMappingURL=index.js.map
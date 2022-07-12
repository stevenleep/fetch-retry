import { RequestInterceptor } from "./requestInterceptor";
import { ResponseInterceptor } from "./responseInterceptor";

export default {
    interceptor: {
        request: new RequestInterceptor(),
        response: new ResponseInterceptor(),
    }
}
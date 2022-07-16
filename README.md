## retry

为 Fetch 增加重试功能

## npm
```bash
npm i http-retries
```

## usage

```typescript
import { enhanceFetchRetry as createFetchRetry } from "../../lib/fecth";

const successURL = "https://jsonplaceholder.typicode.com/todos/1";
const errorURL = successURL + "error";

const myFetch = createFetchRetry(fetch, {
  retries: 5,
  delay: 1000,
  condition: function (
    promiseResponse,
    response,
    count,
    context,
    retryOptions
  ) {
    console.log(count);
    if (count >= 2) {
      context.input = successURL;
    }
    return response.status === 404;
  },
});

myFetch(errorURL)
  .then((res) => {
    console.log("Success", res);
  })
  .catch((errors) => {
    console.log(errors);
  });
```

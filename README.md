# retry
`Fetch` `Axios` 请求重试库, 研发中

- [x] Fetch 需要为其增加 `拦截器` 支持, 通过分析响应数据判断是否需要去retry(retry规则由开发者自行实现)
- [ ] Axios 扩展响应拦截器
- [ ] 更优雅的retry

## Fetch Example
**全局拦截**<br/>
> 每一个请求都会走校验和重试, enabled 可关闭或使用condition自行校验
```typescript
import createRetry from "../src";
const fetchRetry = createRetry(fetch, {
    delay: 1000, // 1s重试一次
    retries: 3, // 重试3次
    enabled: false, // 关闭全局的
    
    // 在什么情况下会执行重试, 返回Promise<boolean> 或 boolean
    // 当为true时会继续重试, 直到retries次数执行完
    condition: async function (response: Promise<Response>, context: { input: RequestInfo | URL; init?: RequestInit | undefined; retryOptions: any; count: number; }){
        //. do something... 
        return boolean;
    }
});
```
**如何使用?**
```typescript
const data = fetchRetry("https://www.baidu.com/api/safe", {
    headers: {},
    // ...正常的fetch使用方式
}).then((response) => {
    // 这是原来的fecth响应
    console.log(response);
})
```

**针对某一个请求启用重试**<br/>
你可以单独为某个请求增加retryOptions
```typescript
const data = fetchRetry("https://www.baidu.com/api/safe", {
    headers: {},
    // ...正常的fetch使用方式
    
    delay: 1000, // 1s重试一次
    retries: 3, // 重试3次
    enabled: false, // 关闭全局的
    
    // 在什么情况下会执行重试, 返回Promise<boolean> 或 boolean
    // 当为true时会继续重试, 直到retries次数执行完
    condition: async function (response: Promise<Response>, context: { input: RequestInfo | URL; init?: RequestInit | undefined; retryOptions: any; count: number; }){
        //. do something... 
        return boolean;
    }
    
}).then((response) => {
    // 这是原来的fecth响应
    console.log(response);
})
```

export default class Interceptor {
    middleware: Function[] = [];

    constructor() { }

    use(middleware: Function) {
        this.middleware.push(middleware);
    }

    clear() {
        this.middleware = [];
    }
    async run(response: any, data: any, context) {
        this.middleware.forEach(async (middleware) => {
            await middleware(response, data, context);
        });
    }
}
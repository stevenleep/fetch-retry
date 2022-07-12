abstract class Middleware {
    abstract intercept(context: Object, next: Object): Promise<void>;
}
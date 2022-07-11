import createRetry from "../lib";

describe('createRetry', function () {
    it('should can worked', function () {
       expect(createRetry()).toBe("WORKED");
    });
});
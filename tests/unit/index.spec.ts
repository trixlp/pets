const hello = 'Hello World';
const a = 5;
const b = 10;

describe('simple test', () => {
    it('say hello world', () => {
        expect(hello).toBe('Hello World')
    })

    it('sum test', () => {
        expect(a + b).toBe(15);
    })

    it('test cast', () => {
        expect(a + hello).toBe('5Hello World')
    })
})
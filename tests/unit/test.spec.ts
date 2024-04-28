function sum (a: number, b: number) {
    return a + b
}

describe('sum function testing', () => {
    it('default sum', () => {
        expect(sum(5, 5)).toBe(10)
    })

    it('sum with minus', () => {
        expect(sum(3, -2)).toBe(1)
    })
    
    it('sum with 2 minus', () => {
        expect(sum(-3, -2)).toBe(-5)
    })
})


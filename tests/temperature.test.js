
const {
    forengToCelc
} = require('../src/helpers/temperature')




    test('Converts F to C', async () => {
        const result = await forengToCelc(32)
        expect(result).toBe(0)
    })


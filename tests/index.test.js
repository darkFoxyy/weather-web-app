const app = require('../src/index')
const request = require('supertest')

describe('Checks server', function() {
test('Respond from /weather', (done) =>{
    request(app)
      .get('/weather')
      .expect(200, done)
})
})
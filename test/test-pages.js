const expect = require('chai').expect
const request = require('request')

it('Home page', (done)=>{
    request('http://localhost:3000/test', (error, res, body) => {
        expect(body).to.contains('<h2>Register</h2>')
        done()
    })
})
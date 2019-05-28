const mocha = require('mocha');
const chai = require('chai');
const assert = chai.assert;

const app = require('../app');
const http = require('chai-http')
chai.use(http);
const request = chai.request;

describe('user functional tests', ()=> {
    it('should returns users',()=>{
        chai.request(app).get('/user').end((err, res) => {
         
          assert.equal(res.status,200);


        })
    })
})
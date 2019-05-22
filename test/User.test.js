const mocha = require('mocha');
const assert = require('assert')
const User = require('../Models/User')

describe("User get data ", function() {

    it('test get users', function() {
       User.find({}).then(users => {
           assert(users != null);
       })

    })
})
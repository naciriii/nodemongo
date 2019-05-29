const mocha = require('mocha');
const mongoose = require('mongoose')
const User = require('../../Models/User')
const chai = require('chai');
const assert = chai.assert;

const app = require('../../app')
const http = require('chai-http')

chai.use(http);
const request = chai.request;

describe('user functional tests', function () {
  this.timeout(15000)

  before(async ()=> {
 
    let url = "mongodb://nacer:moslem1990@cluster0-shard-00-00-tksix.mongodb.net:27017,cluster0-shard-00-01-tksix.mongodb.net:27017,cluster0-shard-00-02-tksix.mongodb.net:27017/Learning?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"; 
 
    
   mongoose.connect(url,{ useNewUrlParser: true });
   let db = mongoose.connection;
    db.on('error', function (err) {

        
    })
  

})

    it('should returns users',()=>{
     
      chai.request(app).get('/user').end((err, res) => {
         
          assert.equal(res.status,200);


       })
    })
    it('should delete user', async () =>{
 
      let users = await User.find({});
    
      if(users.length) {
        const selectedUser  = users[0]
        chai.request(app).get(`/user/delete/${selectedUser._id}`).end((err, res)=> {
        
          assert.equal(res.status,200)
       
    
    })
   
   
    } else {
      let user = new User({
        login:"nacer",
        password:"testing",
        age:50
      });
     const selectedUser = await user.save();
     chai.request(app).get(`/user/delete/${selectedUser._id}`).end((err, res)=> {
        
      assert.equal(res.status,200)
   

})
   

      
    }


    })
      

    
})
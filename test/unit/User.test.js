const mocha = require('mocha');
const assert = require('chai').assert

const app = require('../../app')
const mongoose = require('mongoose');
const User = require('../../Models/User')






describe("User Unit ", function () {
    this.timeout(15000);
    before(async ()=> {
 
        let url = "mongodb://nacer:moslem1990@cluster0-shard-00-00-tksix.mongodb.net:27017,cluster0-shard-00-01-tksix.mongodb.net:27017,cluster0-shard-00-02-tksix.mongodb.net:27017/Learning?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"; 
     
        
       mongoose.connect(url,{ useNewUrlParser: true });
       let db = mongoose.connection;
        db.on('error', function (err) {
            
            
        })
      
    
    })


    it('should get users', async function() {
        let users = User.find({});
        assert(users != null);

    })
    it('should get single user', async function() {
       
       let users = await User.find({})
            if(users.length) {
                let expecteduser = users[0];
               let user = await User.findById(expecteduser._id); 
                    assert(user!== null);
                }
        })

        it('should update user', async function() {
            let users = await User.find({})


         
            if(users.length) {
                let expecteduser = users[0];
               let user = await User.findById(expecteduser._id);
              
                assert.isNotNull(user)
             
                 user = await User.findById(expecteduser._id);
       
                 assert.strictEqual(user.login,"Naciri")
                

                    
                   
                  
                   
                }

        })
        it('should delete user', async function() {
      
            let users = await User.find({})
     
     
              
                 if(users.length) {
                     let expecteduser = users[0];
                    let user = await User.findById(expecteduser._id);
                    let stat = await User.findByIdAndRemove(user._id)
                  user = await User.findById(expecteduser._id);
                

                  assert(user === null)
                 }

        })

     
       
    
})
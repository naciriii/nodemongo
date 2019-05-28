const mocha = require('mocha');
const assert = require('chai').assert
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../Models/User')




describe("User get data ", function() {
    before(async ()=> {
 
        let url = "mongodb://nacer:moslem1990@cluster0-shard-00-00-tksix.mongodb.net:27017,cluster0-shard-00-01-tksix.mongodb.net:27017,cluster0-shard-00-02-tksix.mongodb.net:27017/Learning?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"; 
     
        
       mongoose.connect(url,{ useNewUrlParser: true });
       let db = mongoose.connection;
        db.on('error', function (err) {
            console.log(err);
            
        })
      
    
    })


    it('should get users', async function() {
        let users = User.find({});
        assert(users != null);

    })
    it('should get single user', async function() {
        this.timeout(5000)
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
                let status = User.updateOne(user._id, {
                    login: "Naciri"
                })
                 user = await User.findById(expecteduser._id);
       
                 assert.strictEqual(user.login,"Naciri")
                

                    
                   
                  
                   
                }

        })
        it('should delete user', async function() {
            this.timeout(5000)
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
const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

class Database {
    

    constructor() {
        this.db = null;
        this.url = "mongodb://localhost:27017/Database";
       
    }
    async getDb() {
     
        
   
        if(this.db == null) {
       this.db = await mongo.connect(this.url, {useNewUrlParser: true});
        }
       return this.db.db('Database');
    
    }
   async getUsers() {
       
       let db = await this.getDb();
      
       let users =  db.collection('users').find({}).toArray();
       return users;
    }
    async findUser(id) {
        let db = await this.getDb();
        let user = db.collection('users').findOne({_id:new ObjectId("5cdd4f3d4093459e4bcf204f")});
        return user;

    }




}

module.exports = function() {
    return new Database;
}
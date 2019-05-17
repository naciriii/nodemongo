const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');

class Database {
    

    constructor() {
        this.db = null;
        this.url = "mongodb+srv://nacer:moslem1990@database-qltrm.mongodb.net/test?retryWrites=true";
       
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
    async storeUser(user) {
        let db = await this.getDb();
        let res = db.collection('users').insertOne(user);
        return res;
    }
    async login(user) {
        let db = await this.getDb();
        let dbuser = await db.collection('users').findOne({login:user.login});
        if(dbuser === null) {
            throw new Error('User doesnt exist');
            
        } 

        let res = await bcrypt.compare(user.password, dbuser.password);
            if(res) {
                return dbuser
            }else{
                throw new Error('user not found wrong poass');
            }
        
    }
    async removeUser(id) {
        let db = await this.getDb();
        let res = db.collection('users').deleteOne({_id: new ObjectId(id)});
        return res;
    }




}

module.exports = function() {
    return new Database;
}
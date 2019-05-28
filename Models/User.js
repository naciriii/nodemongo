const mongoose = require('mongoose')
const bcrypt = require('bcrypt') 
const schema  = mongoose.Schema
UserSchema = new schema(
    {
        login:
        {
            type:"string",
            required: true
        },
        password: {
            type: "string",
            required: true
        },
        age:
        {
            type:"number",
            required: true
        },
        posts: [
            {
            type:schema.ObjectId,
            ref: 'post'
        }
    ]
    }
);
UserSchema.statics.loginAct = async function(login, password){
  let user = await this.findOne({
      login: login
  })
      if(user === null) {

          throw new Error(false);
     
  } else {
     
      let stat = await bcrypt.compare(password, user.password);
     if(stat) {
        return user;
     }  else {
         throw new Error(false);
     }
    
  }
    
}

module.exports = mongoose.model("User", UserSchema,'users')
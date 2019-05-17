const db = require("../Models/Database")();
const bcrypt = require('bcrypt');
const Joi = require('joi');

class UserController {

    index(request, response)
    {
        //response.render('users/index.ejs',{users: []});
      db.getUsers().then(users => {
          //console.log(users);

            response.render('users/index.ejs',{users: users});
            
        }).catch(e=> console.log(e))
      

    }
    show(req, res) {
        let param = req.params.id;
        db.findUser(param).then(user=> {
     res.send(user);
        
            

        }).catch(e=>console.log(e))
    }
    store(req, res)
    {
        
       
        let scheme = {
            login:Joi.string().min(3).required(),
            password:Joi.string().min(3).required(),
            age:Joi.number().required()
        }
        let {error} = Joi.validate(req.body,scheme);

        if(error) {
            
            req.session.errors = error.details;
            response.redirect(request.header('Referer'));

        }
        let user = {
            login:req.body.login,
            password:req.body.password,
            age:req.body.age
        }

     bcrypt.hash(user.password, 5).then(hash => {
         user.password = hash;
      
         db.storeUser(user).then(result=> {
             req.session.success = true;
       
             res.redirect('/user');


         }).catch(err=>{
             console.log('err', err);

         })



     }).catch(err=> {})
           


    //hash.then(res=>console.log(res))
    
   

}
}
module.exports = function () {
    return  new UserController;
}
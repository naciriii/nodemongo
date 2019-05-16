const db = require("../Models/Database")();

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
            password:Joi.string().min(3).required()
        }
        let {error} = Joi.validate(request.body,scheme);

        if(error) {
            
            request.session.errors = error.details;
            response.redirect(request.header('Referer'));

        }
        let user = {
            login:req.body.login,
            password!:req.body.password
        }

    }


}
module.exports = function () {
    return  new UserController;
}
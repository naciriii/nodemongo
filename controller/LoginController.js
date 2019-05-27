const Joi = require('joi'
)
const User = require('../Models/User')

class LoginController {



    index(request, response)
    {
       
       
        response.render('login.ejs');

    }
    postLogin(request, response)
    {
        
 
       /* let scheme = {
            login:Joi.string().min(3).required(),
            password:Joi.string().min(3).required()
        }
        let {error} = Joi.validate(request.body,scheme);

        if(error) {
            
            request.session.errors = error.details;
            return response.redirect(request.header('Referer'));
         


        }*/
        let {login} = request.body;
        let {password} = request.body;
     
          User.loginAct(login, password).then(result=> {
       
            request.session.user = {name:result.login, id: result._id};
             
           

              return response.redirect('/user')
          }).catch(error => {
              
            request.session.errors = [{message: "wrong credentials"}]
            return response.redirect(request.header('Referer'));
          })

    }
    logout(req, res)
    {
        req.session.destroy();
         return res.redirect('/login');

    }


}
module.exports = function () {
    return  new LoginController;
}
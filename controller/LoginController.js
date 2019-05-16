const Joi = require('joi'
)
class LoginController {



    index(request, response)
    {
       
        response.render('login.ejs');

    }
    postLogin(request, response)
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
        let {login} = request.body;
        let {password} = request.body;
        if (login === 'nacer' && password === 'nacer') {
            request.session.user = {name:login}
         
    
            response.redirect('/user')


        } else {
            request.session.errors = [{message: "wrong credentials"}]
            response.redirect(request.header('Referer'));
        }
 

        
  
        
        
       

    }
    logout(req, res)
    {
        req.session.destroy();
         res.redirect('/login');

    }


}
module.exports = function () {
    return  new LoginController;
}
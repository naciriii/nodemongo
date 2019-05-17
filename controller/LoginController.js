const Joi = require('joi'
)
const db = require("../Models/Database")();

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
            return response.redirect(request.header('Referer'));
         


        }
        let {login} = request.body;
        let {password} = request.body;

        db.login(request.body).then(stat => {
           
            request.session.user = {name:login};
            
            return response.redirect('/user')

        

        }).catch(err=> {
            
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
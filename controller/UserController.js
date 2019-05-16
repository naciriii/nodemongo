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


}
module.exports = function () {
    return  new UserController;
}
const db = require("../Models/Database")();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../Models/User');
const Post = require('../Models/Post');


class UserController {

    index(request, response)
    {
      
      User.find({}).populate('posts').then(users => {
   
            return response.render('users/index.ejs',{users: users});
            
        }).catch(e=> console.log(e))
      

    }
    show(req, res) {
        let param = req.params.id
      User.findById(param).then(data => {
          return res.json(data);
      })
   
    }
    store(req, res)
    {
     
       
       
        
       
        let scheme = {
            login:Joi.string().min(3).required(),
            password:Joi.string().min(3).required(),
            age:Joi.number().required(),
            posts:Joi.array()
        }
        let {error} = Joi.validate(req.body,scheme);

        if(error) {
            
            req.session.storeErrors = error.details;
            return res.redirect('back');

        }
        if(req.body.posts.length) {
          
            Post.bulkInsert(req.body.posts).then(docs=> {
         
               

                let user = {
                    login:req.body.login,
                    password:req.body.password,
                    age:req.body.age,
                    posts:docs
                }
                
        
             bcrypt.hash(user.password, 5).then(hash => {
                 user.password = hash;
                    let u = new User(user);
                  
                 u.save().then(result=> {
                     req.session.success = "Added Successfully!";
               
                     return res.redirect('/user');
        
        
                 }).catch(err=>{
                     console.log('err', err);
        
                 })


            })

      
    
     



     }).catch(err=> {})
    }
           


  
    
   

}
remove(req, res) {
   
    let id = req.params.id;


   User.deleteOne({_id:id}).then(r=> {
      
     req.session.success = "Deleted Successfully!";
       
            return res.redirect('/user');

   }).catch(err=> {

   })

}
update(req, res)
{ 
   
   
    let scheme = {
        id:Joi.string().required(),
        login:Joi.string().min(3).required(),
        age:Joi.number().required()
    }

    if(req.body.password) {
        scheme.password = Joi.string().min(5)
    }

    let {error} = Joi.validate(req.body,scheme);
 

    if(error) {
        
        req.session.updateErrors = error.details;
        return res.redirect('back');

    }

    let user = {
        _id:req.body.id,
        login:req.body.login,
     
        age:req.body.age
    }
 let t = (async () => {
    
        if(req.body.password) {
            user.password = req.body.password;
            let hash = await bcrypt.hash(user.password, 5);
            user.password = hash;
            return user;

        } else {
            return user;

        }
    }
    )()
    t.then(user => {

     User.find(user).then(result=> {
     
        req.session.success = "Updated Successfully!";
  
        return res.redirect('/user');


    }).catch(err=>{
        console.log('err', err);

    })
        
    })
  

  




       






}

}
module.exports = function () {
    return  new UserController;
}
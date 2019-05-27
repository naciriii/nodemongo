const db = require("../Models/Database")();
const Joi = require('joi');
const Post = require('../Models/Post');
const User = require('../Models/User');


class PostController {

    async index(request, response)
    {   
        let users =  await User.find({});

     
      

      
      Post.find({}).populate('author').exec().then(Posts => {
          //res.send(Posts)
          console.log(Posts);
            return response.render('posts/index.ejs',{posts: Posts, users: users});
            
        }).catch(e=> console.log(e))
      

    }
    show(req, res) {
        let param = req.params.id
      Post.findById(param).then(data => {
          return res.json(data);
      })
   
    }
    store(req, res)
    {
      
       
        
       
        let scheme = {
            title:Joi.string().min(3).required(),
            page_number:Joi.number().min(3).required(),
           author:Joi.string().required(),

        }
        let {error} = Joi.validate(req.body,scheme);

        if(error) {
            
            req.session.storeErrors = error.details;
            return res.redirect('back');

        }
    
        let post = {
            title:req.body.title,
            pages:req.body.page_number,
            author: req.body.author
        }


            let u = new Post(post);
            console.log(u);
         u.save().then(result=> {
             req.session.success = "Added Successfully!";
       
             return res.redirect('/post');


         }).catch(err=>{
             console.log('err', err);
             res.send(err);

         })



    
           


  
    
   

}
remove(req, res) {
   
    let id = req.params.id;


   Post.findByIdAndRemove(id).then(r=> {
      
     req.session.success = "Deleted Successfully!";
       
            return res.redirect('/post');

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

    let Post = {
        _id:req.body.id,
        login:req.body.login,
     
        age:req.body.age
    }
 let t = (async () => {
    
        if(req.body.password) {
            Post.password = req.body.password;
            let hash = await bcrypt.hash(Post.password, 5);
            Post.password = hash;
            return Post;

        } else {
            return Post;

        }
    }
    )()
    t.then(Post => {

     Post.find(Post).then(result=> {
     
        req.session.success = "Updated Successfully!";
  
        return res.redirect('/post');


    }).catch(err=>{
        console.log('err', err);

    })
        
    })
  

  




       






}

}
module.exports = function () {
    return  new PostController;
}
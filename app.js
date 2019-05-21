const express = require('express')
const session = require('express-session')
const methodOverride = require('method-override')
const db = require('./Models/Db');



const app = express()
const _userRoutes = require('./routes/user')
const _loginRoutes = require('./routes/login')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({secret: "naciri", resave: true, saveUninitialized: true}))
app.use((req, res, next)=>{res.locals.session = req.session; next();})
app.use(methodOverride('_method'));
app.set('view engine', 'ejs')
app.set('views', __dirname + '/templates')
app.use('/',_loginRoutes)
app.use('/user',_userRoutes)



/*app.use((req, res, next)=> {
    let isAuth = req.session.user || false;
    if( !isAuth) {
        res.redirect('/login')    
    } else {
        res.redirect('/user')
    }
})*/
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Connecting on port: ${port}`)
    

})
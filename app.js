require('dotenv').config()
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const mongoose=require('mongoose');
const Blog= require('./models/blog');
const User=require('./models/user');; 
var cors =require('cors');
var getData = require('./routes/getData')
var crudBlog =require('./routes/CRUDblog');
app.use(cors());
mongoose.connect('mongodb://localhost:27017/Blogger' ,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on('connected', () =>{
    console.log('Mongoose is connected');
});

const initializePassport = require('./passport-config')
// initializePassport(
//   passport,
//   email => users.find(user => user.email === email),
//   id => users.find(user => user.id === id)
// )


app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use('/getData',getData)
app.use('/crud',crudBlog)


app.get('/admin', checkAuthenticated, (req, res) => {
      Blog.find({_id:req.user.blog},(err,blog)=>{
      if(err){console.log(err)
        res.status(200).send('Error receiving the data')}
      else{
        res.render('index.ejs', { user: req.user,blogs:blog })
        
              
      }
    })
    

  
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/login',
  failureFlash: true
}))


app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/admin')
  }
  next()
}

app.get('/register',(req,res)=>{
  res.render('register.ejs');
})
app.post('/register',(req,res)=>{

  


  
const data={
  name:req.body.name,
  username:req.body.email,
  password:bcrypt.hashSync(req.body.password, 10),
}

const newUser= new User(data);
  newUser.save((error)=>{
      if(error){
          res.status(500).json({msg:"Server Error"});
      }
      else{   res.redirect('/admin');
      ;
  }
  })
 

})

// app.get('/', (req ,res)=>{
//   blog.find({ })
//       .then((data)=>{
//           console.log(data);
       
//           res.render('home.ejs',{blog:data});   
         
//       })
      
//       .catch((error)=>{
//           console.log('error: ',error);
//       })
      
 

      
// });


   

  

app.listen(5000);

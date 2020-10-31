if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const mongoose=require('mongoose');
const blog= require('./models/blog');
const User=require('./models/user');
const test=require('./models/testmon');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs'); 
var path = require('path'); 
var cors =require('cors');
var getData = require('./routes/getData')
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
const hash = bcrypt.hashSync(process.env.PASSWORD, 10);
const users = []

users.push({
  id: Date.now().toString(),
  name: 'Jhon21',
  email: 'Jhon@gmail.com',
  password: hash,
});


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



app.get('/admin', checkAuthenticated, (req, res) => {
  
  res.render('index.ejs', { name: req.user.name })
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


   

   var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
  
var upload = multer({ storage: storage }); 

app.post('/blog', upload.single('image'), (req, res, next) => { 
  
  var data = { 
      title: req.body.title, 
      content: req.body.content, 
      img: { 
          data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
          contentType: 'image/png'
      } ,
      author:req.body.author,
      category:req.body.category,
      date:Date.now(),
  } 
 
  const newblog= new blog(data);
  newblog.save((error)=>{
      if(error){
          res.status(500).json({msg:"Server Error"});
      }
      else{   
        
  }
  })
  
  User.findOne({ name: 'vish' }, function(error, user) {
    if (error) {
      return handleError(error);
    }
    console.log(user);
    user.blog.push(newblog);
    // prints "Ian Fleming"
    console.log(user);
    user.save((error)=>{
      if(error){
        res.status(500).json({msg:"Error saving user blog"});
      }
      else{
        res.redirect('/admin');
      }
    })
  });
  // User.findOne({name:'vish'},(err,user)=>{
  //   console.log(user.blog)
  // })
//   User.
//   findOne({ name: 'vish' }).
//   populate('blog').
//   exec(function (err, user) {
//     if (err) return handleError(err);
//     console.log(user.blog);
//     // prints "The author is Ian Fleming"
//   });
 }); 

app.listen(5000);

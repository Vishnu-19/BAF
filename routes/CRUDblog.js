const express=require ('express');
const multer =require('multer');
const router = express.Router();
var fs = require('fs');
var path = require('path')
var upload = multer({ dest: '../uploads/' });

const Blog= require('../models/blog')
const User = require('../models/user')

var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
  
var upload = multer({ storage: storage }); 


router.get('/', (req ,res)=>{
    Blog.find({ })
        .then((data)=>{
            
            res.json(data);
        })
        .catch((error)=>{
            console.log('error: ',error);
        })
});


router.post('/create', upload.single('image'), (req, res, next) => { 
  
  var data = { 
      title: req.body.title, 
      content: req.body.content, 
      img: { 
          data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)), 
          contentType: 'image/png'
      } ,
      author:req.body.author,
      category:req.body.category,
      date:Date.now(),
  } 
 
  const newblog= new Blog(data);
  newblog.save((error)=>{
      if(error){
          res.status(500).json({msg:"Server Error"});
      }
      else{   
        
  }
  })

  
  User.findOne({ name: req.query.user }, function(error, user) {
    if (error) {
      return handleError(error);
    }
    
    user.blog.push(newblog);
    
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
router.get('/update',(req,res)=>{
  console.log(req.query);
  res.render('update.ejs',{id:req.query.id})
})
router.route('/update').post(function(req,res){
const id = req.query.id;
const newdata={
  "title":req.body.title,
    "content":req.body.content  
}
    Blog.findByIdAndUpdate(id,newdata,{useFindAndModify:false}, function(err, result){

        if(err){
            res.send(err)
        }
        else{
            res.redirect('/admin');
        }
    })
})
router.post('/delete',(req,res)=>{
     const id= req.query.blog_id;
    const username=req.query.user;
	 
  User.findOne({ username: username }, function(error, user) {
    if (error) {
      return handleError(error);
    }
    
    if(user.blog.indexOf(id)===-1)
    {
        res.status(404).json({msg:"Error finding user blog"});
    }
    else{ 
    user.blog.splice(user.blog.indexOf(id),1);
    user.save((error)=>{
      if(error){
        res.status(500).json({msg:"Error saving user blog"});
      }
      else{
        
    Blog.findByIdAndRemove(id, {useFindAndModify:false},(err, blog) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const responseq = {
            message: "blog successfully deleted",
           
        };
        res.redirect('/admin');
    });
      }
    })
}
  })
  
   
    

    
    })

module.exports = router;
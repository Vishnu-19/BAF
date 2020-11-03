const mongoose=require('mongoose')
var express = require('express')
var router = express.Router()

const Blog = require('../models/blog');

// define the home page route
router.get('/getBlog', function (req, res) {
    Blog.find({ })
    .then((data)=>{
        
     
        res.json(data).status(200);       
       
    })
    .catch((error)=>{
        console.log('error: ',error);
    })
    
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router;

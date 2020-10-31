const mongoose=require('mongoose');

const userSchema = mongoose.Schema({
    username:String,
    name:String,
    password:String,
    // profile:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Profile'   
    // },
    blog:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blog'
    }],
    
  })

  
const User =mongoose.model('User', userSchema);

module.exports =User;
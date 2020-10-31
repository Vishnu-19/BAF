const mongoose=require('mongoose');


const Schema=mongoose.Schema;
const blogSchema= new Schema({
    
    title:String,
    content:String,
    img: { data: Buffer, contentType: String }, 
    author:String,
    category:String,
    date:Date,
    // comments: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Comment'
    //     }
    //   ]
});

const blog =mongoose.model('blog', blogSchema);

module.exports =blog;
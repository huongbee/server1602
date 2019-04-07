const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    author : { type: Schema.Types.ObjectId, ref:'user'}, 
    content: {type:String, required:true}, 
    likes:[
        {type: Schema.Types.ObjectId, ref:'user'}
    ], 
    comments: [
        {type: Schema.Types.ObjectId, ref:'comment'}
    ]
})
const PostModel = mongoose.model('post',PostSchema)
// create , update, delete, like, dislike
module.exports = PostModel
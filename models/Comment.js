const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    author : {type:Schema.Types.ObjectId, ref:'user'}, 
    post: {type:Schema.Types.ObjectId, ref:'post'}, 
    content:{ type:String, required:true}, 
    likes: [
        {type:Schema.Types.ObjectId, ref:'user'}
    ],
    replies:[
        {
            author:{type:Schema.Types.ObjectId, ref:'user'},
            content: { type:String, required:true},
            likes:[
                {type:Schema.Types.ObjectId, ref:'user'}
            ],
        }
    ]
})
const CommentModel = mongoose.model('comment',CommentSchema)

// create , update, delete, like, dislike

module.exports = CommentModel
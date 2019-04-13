const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {User} = require('./User')

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

class Post extends PostModel{
    static async createPost(author,content){
        const post = await PostModel.create({author,content})
        if(!post) throw new Error('Cannot create post!');
        const user = await User.findByIdAndUpdate(author,{
            $addToSet:{
                posts: post._id
            }
        },{new: true})
        if(!user){ 
            //remove post
            const p = await PostModel.findByIdAndRemove(post._id)
            throw new Error('Cannot find author!')
        };
        return post;
    }
}

module.exports = {Post, PostModel}
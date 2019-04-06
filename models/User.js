const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash, compare } = require('../lib/bcrypt')

const UserSchema = new Schema({
    email: {type:String, required:true, unique:true}, 
    password : {type:String, required:true}, 
    name: String, 
    posts: [
        {type:Schema.Types.ObjectId, ref:'post'}
    ], 
    friends:[
        {type:Schema.Types.ObjectId, ref:'user'}
    ], 
    receiveRequests:[
        {type:Schema.Types.ObjectId, ref:'user'}
    ], 
    sendRequests:[
        {type:Schema.Types.ObjectId, ref:'user'}
    ]
})
const UserModel = mongoose.model('user',UserSchema)

class User extends UserModel{
    static async signUp(email, password ,name){
        //check email exist
        const userCheck = await UserModel.findOne({email})
        if(userCheck) throw new Error('Email existed!')

        const passwordHash = await hash(password)
        .catch(err=> {
            throw new Error('Please try again!')
        })
        const user = await new UserModel({
            email, password: passwordHash, name
        }).save();
        if(!user) throw new Error('Please try again!')
        return {
            _id : user._id,
            email : user.email,
            name: user.name
        } 
    }
    static async signIn(email, password){
        // find user by email
        // compare password
        // return user with token 

    }
}

module.exports = User

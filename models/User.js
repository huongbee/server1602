const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash, compare } = require('../lib/bcrypt')
const { sign, verify } = require('../lib/jwt')
// const { checkObjectIdUser } = require('../lib/checkObjectId')

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
    static checkObjectIdUser(userId){
        return new Promise((resolve, reject)=>{
            UserModel.findById(userId)
            .then(()=>resolve(true))
            .catch(()=>reject(false))
        })
    }
    
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
        const user = await UserModel.findOne({email})
        if(!user) throw new Error('Can not find user!')
        const checkPassword = await compare(password,user.password)
        .catch(err=>{throw new Error(err.message)})
        if(checkPassword){
            const token = await sign({_id:user._id})
            .catch(err=>{throw new Error(err.message)})
            const userInfo = user.toObject()
            delete userInfo.password
            userInfo.token = token
            return userInfo
            // const { _id, name, email } = user
            // return { _id, name, email, token}
        }
    }
    static async sendFriendRequest(idSender, idReceiver){
        // update sender
        const sender = await UserModel.findByIdAndUpdate(idSender,{
            $addToSet:{
                sendRequests: idReceiver
            }
        },{new:true})
        if(!sender) throw new Error('Can not find user!')
        // update receiver
        const receiver = await UserModel.findByIdAndUpdate(idReceiver,{
            $addToSet:{
                receiveRequests: idSender
            }
        },{new:true})
        if(!receiver){
            const remove =  await UserModel.findByIdAndUpdate(idSender,{
                $pull:{
                    sendRequests: idReceiver
                }
            },{new:true})
            throw new Error('Can not find user!')
        }
        return {sender, receiver}
    }
    static async acceptFriendRequest(userId, senderId){
        const checkUserId = await User.checkObjectIdUser(userId)
        const checkSender = await User.checkObjectIdUser(senderId)
        if(checkSender && checkUserId){
            let user = await UserModel.findByIdAndUpdate(userId,{
                $addToSet:{
                    friends: senderId
                },
                $pull:{
                    receiveRequests: senderId
                }
            },{new:true})
            if(!user) throw new Error('Can not find/update user!')
            let friend = await UserModel.findByIdAndUpdate(senderId,{
                $addToSet:{
                    friends: userId
                },
                $pull:{
                    sendRequests: userId
                }
            },{new:true})
            if(!friend) throw new Error('Can not find/update user!')
            friend = friend.toObject()
            user = user.toObject()
            delete friend.password
            delete user.password
            return { user, friend }
        }
        else{
            return false;
        }
    }

    static async removeFriend(){
           
    }
}

module.exports = { User, UserModel }

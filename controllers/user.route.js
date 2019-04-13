const express = require('express')
const router = express.Router();
const {User} = require('../models/User')
const authenticate = require('../lib/authenticate')

router.post('/signup',(req,res)=>{
    const { email, password, name } = req.body
    User.signUp(email, password, name)
    .then(user=>{
        res.send({
            code: 1,
            data: user,
            message: ''
        })
    })
    .catch(error=>{
        res.send({
            code: 0,
            data: null,
            message: error.message
        })
    })
    

}) 
router.post('/signin',(req,res)=>{
    const { email, password } = req.body
    User.signIn(email,password)
    .then(user=>{
        res.send({
            code: 1,
            data: user,
            message: ''
        })
    })
    .catch(err=>{
        res.send({
            code: 0,
            data: null,
            message: err.message
        })
    })
}) 
router.post('/send-friend-request',authenticate,(req,res)=>{
    const { receiveUser } = req.body
    const sendUser = req.userId
    res.setHeader('token',req.token)
    User.sendFriendRequest(sendUser,receiveUser)
    .then(obj=>{
        res.send({
            code: 1,
            data: {
                sender : obj.sender,
                receiver: obj.receiver,
            },
            message: ''
        })
    })
    .catch(err=>{
        res.send({
            code: 0,
            data: null,
            message: err.message
        })
    })
})

router.put('/accept-friend-request',authenticate,(req,res)=>{
    const { senderId } = req.body
    const userId = req.userId // req.userId from authenticate 
    res.setHeader('token',req.token)
    User.acceptFriendRequest(userId,senderId)
    .then(obj=>{
        res.send({
            code: 1,
            data: {
                user : obj.user,
                friend: obj.friend,
            },
            message: ''
        })
    })
    .catch(err=>{
        res.send({
            code: 0,
            data: null,
            message: err.message
        })
    })
})

// router.delete()


module.exports = router
const express = require('express')
const router = express.Router();
const { Post } = require('../models/Post')
const authenticate = require('../lib/authenticate');
router.use(authenticate)

router.post('/create',(req,res)=>{
    const author = req.userId
    const content = req.body.content;
    res.setHeader('token',req.token)
    Post.createPost(author,content)
    .then(post=>{
        res.send({
            code: 1,
            data: { post },
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
module.exports = router
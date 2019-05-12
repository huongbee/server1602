require('./lib/connectdb')
const express = require('express')
const app = express()
const bodyParser = require('body-parser').json();
app.use(bodyParser)
const cors = require('cors');
const authenticate = require('./lib/authenticate');
const userRouter = require('./controllers/user.route');
const postRouter = require('./controllers/post.route');
app.use(cors());
app.use('/user',userRouter);
app.use('/post',postRouter);
app.listen(3000,()=>{
    console.log('Server started!')
})
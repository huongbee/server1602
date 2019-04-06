require('./lib/connectdb')
const express = require('express')
const app = express()
const bodyParser = require('body-parser').urlencoded({extended:false})
app.use(bodyParser)
const userRouter = require('./controllers/user.route')

app.use('/user',userRouter)
app.listen(3000,()=>{
    console.log('Server started!')
})
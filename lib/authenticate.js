const { verify } = require('./jwt')

function authenticate(req, res, next){
    const { token } = req.headers
    if(!token) 
        return res.send({
            code: 0,
            data: null,
            message: 'Can not find token!'
        })
    verify(token)
    .then(obj=>{
        next()
    })
    .catch(err=>{
        res.send({
            code: 0,
            data: null,
            message: err.message
        })
    })
}
module.exports = authenticate
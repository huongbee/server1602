const { sign, verify, blacklist } = require('./jwt')

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
        //refresh token
        return sign(obj)
        .then(newtoken=>{
            return blacklist(token)
            .then(()=>{
                req.userId = obj._id 
                req.token = newtoken
                next()
            })
        })
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
const jwt = require('jsonwebtoken')
const jwtBlacklist = require('jwt-blacklist')(jwt);
const SECRET_KEY = 'chuoibaomat123456789'

function sign(obj){
    return new Promise((resolve, reject)=>{
        const token = jwt.sign(obj,SECRET_KEY,{expiresIn:'2 days'})
        if(!token) return reject(new Error('Can not sign token!'));
        return resolve(token) 
    })
}

function verify(token){
    return new Promise((resolve, reject)=>{
        const obj = jwt.verify(token,SECRET_KEY)
        if(!obj)return reject(new Error('Can not verify token!'));
        delete obj.exp
        delete obj.iat
        return resolve(obj)
    })
}

function blacklist(token){
    return new Promise((resolve, reject)=>{
        const check = jwtBlacklist.blacklist(token)
        return check == true ? resolve(check) : reject(new Error('Can not blacklist token!'))
    })
}
module.exports = { sign, verify, blacklist }
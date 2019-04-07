const User = require('../models/User')

function checkObjectIdUser(userId){
    return new Promise((resolve, reject)=>{
        User.findById(userId)
        .then(()=>resolve(true))
        .catch(()=>reject(false))
    })
}

module.exports = { checkObjectIdUser }
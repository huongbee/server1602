const UserModel = require('../models/User').UserModel

function checkObjectIdUser(userId){
    return new Promise((resolve, reject)=>{
        UserModel.findById(userId)
        .then(()=>resolve(true))
        .catch(()=>reject(false))
    })
}

module.exports = { checkObjectIdUser }
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/project1602',{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>{
    console.log('DB connected!')
});



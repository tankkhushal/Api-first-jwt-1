 const mongoose = require ('mongoose')

 const singupSchema =  mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
 })

 const singup = mongoose.model('singup',singupSchema);

 module.exports = singup;
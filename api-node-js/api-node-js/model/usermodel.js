const mongoose = require('mongoose')
const path = require('path')
const multer = require('multer')
const imagePath = '/uploads'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hobby: {
        type: Array,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    userImage : {
        type : String,
    }
},{
    timestamps : true
})
const userdata = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',imagePath))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now())
    }
})

userSchema.statics.uploadImage = multer({storage:userdata}).single('image');
userSchema.statics.imgPath = imagePath


const user = mongoose.model('user', userSchema);

module.exports = user;
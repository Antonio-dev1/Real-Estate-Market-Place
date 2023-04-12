const mongoose  = require('mongoose');
module.exports = mongoose.model('users' , {
    fullName: {type: String , required: true},
    email : {type: String , required: true},
    phoneNumber : {type:String , default : null},
    profilePicture:{type: String , default : null},
    password:{type: String, required :true},
    isAdmin:{type: Boolean , default : false},
    creationDate:{type:Date , default: Date.now}
})
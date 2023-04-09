const mongoose  = require('mongoose');
module.exports = mongoose.model('users' , {
    fullName: {type: String , required: true},
    email : {type: String , required: true},
    phone : {type:String},
    profilePicture:{type: String},
    password:{type: String, required :true},
    isAdmin:{type: Boolean , default : false},
    creationDate:{type:Date}
})
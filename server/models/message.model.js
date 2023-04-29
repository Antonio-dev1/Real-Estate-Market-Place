const mongoose = require('mongoose');
module.exports = mongoose.model('messages' , {
    sender:{type:mongoose.Schema.Types.ObjectId , ref:'users' , required:true},
    receiver:{type:mongoose.Schema.Types.ObjectId , ref:'users' , required:true},
    message:{type:String , required:true},
    convesationId:{type:mongoose.Schema.Types.ObjectId , ref:'conversations' , required:true},
    creationDate:{type:Date , default: Date.now}
});